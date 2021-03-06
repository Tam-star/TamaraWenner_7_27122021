const { Post, User, Comment } = require('../config/db')
const { ValidationError, ForeignKeyConstraintError } = require('sequelize')
const fs = require('fs');
const fsPromises = require("fs/promises");

exports.getAllPosts = (req, res, next) => {
  if (req.query.userId) {
    return Post.findAll({ where: { userId: req.query.userId } })
      .then(posts => {
        const message = `La liste des posts de l'user ${req.query.userId} a bien été récupérée.`
        res.json({ message, data: posts })
      })
  }
  Post.findAll()
    .then(posts => {
      const message = 'La liste des posts a bien été récupérée.'
      res.json({ message, data: posts })
    })
    .catch(error => {
      const message = 'La liste des posts n\'a pas pu être récupérée. Réessayez dans quelques instants'
      res.status(500).json({ message })
      console.log(`Il y a eu une erreur : ${error}`)
    })
}

exports.getPostById = (req, res, next) => {
  Post.findByPk(req.params.id)
    .then(post => {
      if (post === null) {
        const message = "Le post demandé n'existe pas. Réessayez avec un autre identifiant"
        return res.status(404).json({ message })
      }
      const message = 'Le post a bien été récupéré.'
      res.json({ message, data: post })
    })
    .catch(error => {
      const message = 'Le post n\'a pas pu être récupéré. Réessayez dans quelques instants'
      res.status(500).json({ message })
      console.log(`Il y a eu une erreur : ${error}`)
    })
}

exports.createPost = (req, res, next) => {
  try {
    const postObject = req.file ? {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`
    } : req.body

    //Si l'utilisateur indique un id dans son POST, on le supprime
    //pour que cela n'interfère pas avec l'auto-incrémentation de la base de donnée
    if (postObject.id) {
      delete postObject.id
    }
    //To prevent someone from putting a 1000 likes on his or her post
    if (postObject.usersLiked) {
      delete postObject.usersLiked
    }
    //Check if the token is the same as the post userID, so no one can write under another identity
    if (postObject.userId != req.auth.userId) {
      const message = `Veuillez utiliser votre identifiant pour créer ce post`
      return res.status(401).json({ message })
    }

    Post.create({
      ...postObject
    })
      .then(post => {
        const message = `Le post a bien été créé.`
        res.json({ message, data: post })
      })
      .catch(error => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message })
        }
        if (error instanceof ForeignKeyConstraintError) {
          const message = `L'userId n'appartient à aucun de nos utilisateurs`
          return res.status(400).json({ message })
        }
        const message = `Le post n'a pas pu être créé, réessayez dans quelques instants`
        res.status(500).json({ message })
        console.log(`Il y a eu une erreur : ${error}`)
      })
  }
  catch (e) {
    console.log(`Il y a eu une erreur : ${e.message}`)
    const message = `Le post n'a pas pu être créé, réessayez dans quelques instants`
    res.status(500).json({ message })
  }

}


exports.modifyPost = async (req, res, next) => {
  try {
    const postObject = req.file ? {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`
    } : req.body

    if (postObject.id) {
      delete postObject.id //To prevent interfering with auto-increment
    }
    if (postObject.usersLiked) {
      delete postObject.usersLiked //To prevent someone from putting a 1000 likes on his or her post
    }

    const id = req.params.id
    const post = await Post.findByPk(id)
    if (post === null) { //Check if post exists
      const message = 'Le post demandé n\'existe pas. Réessayez avec un autre identifiant'
      return res.status(404).json({ message })
    }
    //Check if the person modifying the post is the one who created it
    if (post.userId != req.auth.userId) {
      const message = `Vous n'êtes pas autorisé à modifier ce post`
      return res.status(401).json({ message })
    }
    //Check if the post already had an image
    if (post.imageUrl && (req.file || postObject.imageUrl === null)) {
      const filename = post.imageUrl.split('/images/posts/')[1]
      await fsPromises.unlink(`images/posts/${filename}`)
    }
    await Post.update(postObject, {
      where: { id: id }
    })
    const message = `Le post a bien été modifié.`
    res.json({ message })
  }
  catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message })
    }
    const message = `Le post n'a pas pu être modifié, réessayez dans quelques instants`
    res.status(500).json({ message })
    console.log(`Il y a eu une erreur : ${error}`)
  }

}

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id)
    //Check if post exists
    if (post === null) {
      const message = 'Le post demandé n\'existe pas. Réessayez avec un autre identifiant'
      return res.status(404).json({ message })
    }
    //Check if the person modifying the post is the one who created it
    if (post.userId != req.auth.userId && req.auth.userRights != 'moderator') {
      const message = `Vous n'êtes pas autorisé à modifier ce post`
      return res.status(401).json({ message })
    }
    const postDeleted = post;
    //In case there is a post picture
    if (post.imageUrl) {
      const filename = post.imageUrl.split('/images/posts/')[1]
      await fsPromises.unlink(`images/posts/${filename}`)
    }
    //First we destroy every comments linked to this post
    await Comment.destroy({
      where: { postId: post.id }
    })
    //Then we destroy the post
    await Post.destroy({
      where: { id: post.id }
    })
    const message = `Le post avec l'identifiant n°${postDeleted.id} a bien été supprimé.`
    res.json({ message, data: postDeleted })
  }
  catch (error) {
    const message = 'Le post n\'a pas pu être supprimé. Réessayez dans quelques instants'
    res.status(500).json({ message, data: error })
    console.log(`Il y a eu une erreur : ${error}`)
  }
}


exports.postLike = (req, res, next) => {
  //L'utilisateur envoie un like : 0 (annule le like) ou 1 (like)
  //Avec son userId
  //Dans la BDD, on ajoute le userId de l'utilisateur qui a liké dans usersLiked
  // {
  //   "like":1,
  //   "userId" : 123456
  // }
  Post.findByPk(req.params.id)
    .then(post => {
      console.log('il s agit du post ', req.params.id)
      if (post === null) {
        const message = "Le post demandé n'existe pas. Réessayez avec un autre identifiant"
        return res.status(404).json({ message })
      }
      if (req.body.like > 1 || req.body.like < 0) {
        const message = 'L\'élement "like" ne peut avoir pour valeur que 0 ou 1'
        return res.status(400).json({ error : message })
      }
      //Like
      let arrayUsersLiked = post.usersLiked == '' ? [] : post.usersLiked.split(',')
      if (req.body.like == 1) {
        //Si l'utilisateur aime déjà le post
        if (arrayUsersLiked.includes(req.body.userId.toString())) {
          const message = 'Vous aimez déjà ce post'
          return res.status(400).json({ error : message })
        }
        const stringUsersLiked = post.usersLiked == '' ? `${req.body.userId}` : `${post.usersLiked},${req.body.userId}`
        return Post.update({ usersLiked: stringUsersLiked }, {
          where: { id: req.params.id }
        })
          .then(_ => {
            const message = `Le post a bien été liké par l'utilisateur ${req.body.userId}.`
            res.json({ message })
          })
      }
      //Unlike
      if (req.body.like == 0) {
        const index = arrayUsersLiked.indexOf(req.body.userId.toString())
        if (index > -1) {
          arrayUsersLiked.splice(index, 1)
          return Post.update({ usersLiked: arrayUsersLiked.join(',') }, {
            where: { id: req.params.id }
          })
            .then(_ => {
              const message = `Vous n'aimez plus ce post.`
              res.json({ message })
            })
        } else {
          const message = `Vous n'aimez déjà pas ce post.`
          res.json({ message })
        }


      }

    })
    .catch(error => {
      if (error instanceof ValidationError) {
        const message = `Vous avez fait une erreur dans le like de ce post`
        return res.status(400).json({ message, data: error })
      }
      if (error instanceof ForeignKeyConstraintError) {
        const message = `L'userId n'appartient à aucun de nos utilisateurs`
        return res.status(400).json({ message, data: error })
      }
      const message = `Le post n'a pas pu être liké, réessayez dans quelques instants`
      res.status(500).json({ message, data: error })
      console.log(`Il y a eu une erreur : ${error}`)
    })
}
