const { Comment } = require('../config/db')
const { ValidationError, ForeignKeyConstraintError } = require('sequelize')
const fs = require('fs');
//const { create } = require('domain');

//Get all comments for one post 
exports.getAllCommentsForOnePost = (req, res, next) => {
  Comment.findAll({ where : {postId : req.params.postId} })
    .then(comments => {
      const message = `La liste des commentaires pour le post n°${req.params.postId} a bien été récupérée.`
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
          return res.status(400).json({ message : error.message })
        }
        if (error instanceof ForeignKeyConstraintError) {
          const message = `L'userId ou le postId n'existe pas`
          return res.status(400).json({ message })
        }
        const message = `Le commentaire n'a pas pu être créé, réessayez dans quelques instants`
        res.status(500).json({ message })
        console.log(`Il y a eu une erreur : ${error}`)
      })
  }
  catch (e) {
    const message = `Le commentaire n'a pas pu être créé, réessayez dans quelques instants`
    res.status(500).json({ message })
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
  //Interdiction de modifier le postId
  if (commentObject.postId) {
    delete commentObject.postId
  }

  const id = req.params.id
  Comment.findByPk(id)
  .then(comment => {
    if (comment === null) {
      const message = 'Le commentaire demandé n\'existe pas. Réessayez avec un autre identifiant'
      return res.status(404).json({ message })
    }
    //Check if the person modifying the post is the one who created it
    if (comment.userId != req.auth.userId) {
      const message = `Vous n'êtes pas autorisé à modifier ce commentaire`
      return res.status(401).json({ message })
    }
    Comment.update(commentObject, {
      where: { id: id }
    })
      .then(_ => {
        const message = `Le commentaire a bien été modifié.`
        res.json({ message })
      })
  })
  .catch(error => {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message : error.message })
    }
    const message = `Le commentaire n'a pas pu être créé, réessayez dans quelques instants`
    res.status(500).json({ message })
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
       //Check if the person modifying the comment is the one who created it
       if (comment.userId != req.auth.userId && req.auth.userRights!= 'moderator') {
        const message = `Vous n'êtes pas autorisé à modifier ce commentaire`
        return res.status(401).json({ message })
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




