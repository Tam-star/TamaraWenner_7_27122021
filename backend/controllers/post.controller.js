const { Post, User } = require('../config/db')
const { ValidationError, ForeignKeyConstraintError } = require('sequelize')
const fs = require('fs');
const { create } = require('domain');

exports.getAllPosts = (req, res, next) => {
  Post.findAll()
    .then(posts => {
      const message = 'La liste des posts a bien été récupérée.'
      res.json({ message, data: posts })
    })
    .catch(error => {
      const message = 'La liste des posts n\'a pas pu être récupérée. Réessayez dans quelques instants'
      res.status(500).json({ message, data: error })
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
      res.status(500).json({ message, data: error })
      console.log(`Il y a eu une erreur : ${error}`)
    })
}

exports.createPost = (req, res, next) => {
  try {
    //Si l'utilisateur indique un id dans son POST, on le supprime
    //pour que cela n'interfère pas avec l'auto-incrémentation de la base de donnée
    // if (req.body.id) {
    //   delete req.body.id
    // }
    Post.create({ ...JSON.parse(req.body.post), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` })
      .then(post => {
        const message = `Le post a bien été créé.`
        res.json({ message, data: post })
      })
      .catch(error => {
        if (error instanceof ValidationError) {
          const message = `Vous avez fait une erreur dans la création de ce post`
          return res.status(400).json({ message, data: error })
        }
        if (error instanceof ForeignKeyConstraintError) {
          const message = `L'userId n'appartient à aucun de nos utilisateurs`
          return res.status(400).json({ message, data: error })
        }
        const message = `Le post n'a pas pu être créé, réessayez dans quelques instants`
        res.status(500).json({ message, data: error })
        console.log(`Il y a eu une erreur : ${error}`)
      })
  }
  catch (e) {
    console.log(`Il y a eu une erreur : ${e.message}`)
  }

}


exports.modifyPost = (req, res, next) => {
  //Si l'utilisateur indique un id dans son POST, on le supprime
  //pour que cela n'interfère pas avec l'auto-incrémentation de la base de donnée
  if (req.body.id) {
    delete req.body.id
  }
  if (req.body.userId) {
    return res.status(400).json({ message: 'Vous ne pouvez pas modifier l\'identifiant utilisateur' })
  }
  const id = req.params.id
  Post.update(req.body, {
    where: { id: id }
  })
    .then(_ => {
      return Post.findByPk(id).then(post => {
        if (post === null) {
          const message = 'Le post demandé n\'existe pas. Réessayez avec un autre identifiant'
          return res.status(404).json({ message })
        }
        const message = `Le post a bien été modifié.`
        res.json({ message, data: post })
      })
    })
    .catch(error => {
      if (error instanceof ValidationError) {
        const message = `Vous avez fait une erreur dans la modification de ce post`
        return res.status(400).json({ message, data: error })
      }
      const message = `Le post n'a pas pu être créé, réessayez dans quelques instants`
      res.status(500).json({ message, data: error })
      console.log(`Il y a eu une erreur : ${error}`)
    })
}

exports.deletePost = (req, res, next) => {
  Post.findByPk(req.params.id).then(post => {
    if (post === null) {
      const message = 'Le post demandé n\'existe pas. Réessayez avec un autre identifiant'
      return res.status(404).json({ message })
    }
    const postDeleted = post;
    return Post.destroy({
      where: { id: post.id }
    })
      .then(_ => {
        const message = `Le post avec l'identifiant n°${postDeleted.id} a bien été supprimé.`
        res.json({ message, data: postDeleted })
      })
  })
    .catch(error => {
      const message = 'Le post n\'a pas pu être supprimé. Réessayez dans quelques instants'
      res.status(500).json({ message, data: error })
      console.log(`Il y a eu une erreur : ${error}`)
    })
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
      if (post === null) {
        const message = "Le post demandé n'existe pas. Réessayez avec un autre identifiant"
        return res.status(404).json({ message })
      }
      if (req.body.like > 1 || req.body.like < 0) {
        const message = 'L\'élement "like" ne peut avoir pour valeur que 0 ou 1'
        return res.status(400).json({ message })
      }
      //Like
      if (req.body.like == 1) {
        const stringUsersLiked = `${post.usersLiked},${req.body.userId}`
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
        let arrayUsersLiked = post.usersLiked.split(',')
        const index = arrayUsersLiked.indexOf(req.body.userId)
        arrayUsersLiked.splice(index, 1)
        if (index > -1) {
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




