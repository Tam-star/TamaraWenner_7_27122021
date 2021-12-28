const { Post } = require('../config/db')
const { ValidationError, ForeignKeyConstraintError } = require('sequelize')

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
  //Si l'utilisateur indique un id dans son POST, on le supprime
  //pour que cela n'interfère pas avec l'auto-incrémentation de la base de donnée
  if (req.body.id) {
    delete req.body.id
  }
  Post.create(req.body)
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


