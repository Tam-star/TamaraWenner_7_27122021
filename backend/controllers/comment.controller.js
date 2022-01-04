const { Comment } = require('../config/db')
const { ValidationError, ForeignKeyConstraintError } = require('sequelize')
const fs = require('fs');
//const { create } = require('domain');

exports.getAllComments = (req, res, next) => {
  Comment.findAll()
    .then(comments => {
      const message = 'La liste des commentaires a bien été récupérée.'
      res.json({ message, data: comments })
    })
    .catch(error => {
      const message = 'La liste des commentaires n\'a pas pu être récupérée. Réessayez dans quelques instants'
      res.status(500).json({ message, data: error })
      console.log(`Il y a eu une erreur : ${error}`)
    })
}

exports.getCommentById = (req, res, next) => {
  Comment.findByPk(req.params.id)
    .then(comment => {
      if (comment === null) {
        const message = "Le commentaire demandé n'existe pas. Réessayez avec un autre identifiant"
        return res.status(404).json({ message })
      }
      const message = 'Le commentaire a bien été récupéré.'
      res.json({ message, data: comment })
    })
    .catch(error => {
      const message = 'Le commentaire n\'a pas pu être récupéré. Réessayez dans quelques instants'
      res.status(500).json({ message, data: error })
      console.log(`Il y a eu une erreur : ${error}`)
    })
}

exports.createComment = (req, res, next) => {
  try {
    const commentObject = req.file ? {
      ...JSON.parse(req.body.comment),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : req.body

    //Si l'utilisateur indique un id dans son POST, on le supprime
    //pour que cela n'interfère pas avec l'auto-incrémentation de la base de donnée
    if (commentObject.id) {
      delete commentObject.id
    }

    Comment.create({
      ...commentObject
    })
      .then(comment => {
        const message = `Le commentaire a bien été créé.`
        res.json({ message, data: comment })
      })
      .catch(error => {
        if (error instanceof ValidationError) {
          const message = `Vous avez fait une erreur dans la création de ce commentaire`
          return res.status(400).json({ message, data: error })
        }
        if (error instanceof ForeignKeyConstraintError) {
          const message = `L'userId n'appartient à aucun de nos utilisateurs`
          return res.status(400).json({ message, data: error })
        }
        const message = `Le commentaire n'a pas pu être créé, réessayez dans quelques instants`
        res.status(500).json({ message, data: error })
        console.log(`Il y a eu une erreur : ${error}`)
      })
  }
  catch (e) {
    console.log(`Il y a eu une erreur : ${e.message}`)
  }

}


exports.modifyComment = (req, res, next) => {

  const commentObject = req.file ? {
    ...JSON.parse(req.body.comment),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : req.body

  //Si l'utilisateur indique un id dans son POST, on le supprime
  //pour que cela n'interfère pas avec l'auto-incrémentation de la base de donnée
  if (commentObject.id) {
    delete commentObject.id
  }

  const id = req.params.id
  Comment.update(commentObject, {
    where: { id: id }
  })
    .then(_ => {
      return Comment.findByPk(id).then(comment => {
        if (comment === null) {
          const message = 'Le commentaire demandé n\'existe pas. Réessayez avec un autre identifiant'
          return res.status(404).json({ message })
        }
        const message = `Le commentaire a bien été modifié.`
        res.json({ message, data: comment })
      })
    })
    .catch(error => {
      if (error instanceof ValidationError) {
        const message = `Vous avez fait une erreur dans la modification de ce commentaire`
        return res.status(400).json({ message, data: error })
      }
      const message = `Le commentaire n'a pas pu être créé, réessayez dans quelques instants`
      res.status(500).json({ message, data: error })
      console.log(`Il y a eu une erreur : ${error}`)
    })
}

exports.deleteComment = (req, res, next) => {
  Comment.findByPk(req.params.id)
    .then(comment => {
      if (comment === null) {
        const message = 'Le commentaire demandé n\'existe pas. Réessayez avec un autre identifiant'
        return res.status(404).json({ message })
      }
      const commentDeleted = comment;
      const filename = comment.imageUrl.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        return Comment.destroy({
          where: { id: comment.id }
        })
          .then(_ => {
            const message = `Le commentaire avec l'identifiant n°${commentDeleted.id} a bien été supprimé.`
            res.json({ message, data: commentDeleted })
          })
      })

    })
    .catch(error => {
      const message = 'Le commentaire n\'a pas pu être supprimé. Réessayez dans quelques instants'
      res.status(500).json({ message, data: error })
      console.log(`Il y a eu une erreur : ${error}`)
    })
}




