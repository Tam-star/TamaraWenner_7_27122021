const { User } = require('../config/db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { ValidationError, ForeignKeyConstraintError, UniqueConstraintError } = require('sequelize');
const { errorMonitor } = require('stream');

exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then(users => {
      const message = 'La liste des utilisateurs a bien été récupérée.'
      res.json({ message, data: users })
    })
    .catch(error => {
      const message = 'La liste des utilisateurs n\'a pas pu être récupérée. Réessayez dans quelques instants'
      res.status(500).json({ message, data: error })
      console.log(`Il y a eu une erreur : ${error}`)
    })
}

exports.getUserConnected = (req, res, next) => {
  User.findByPk(req.auth.userId)
    .then(user => {
      const message = 'L\'utilisateur a bien été récupéré.'
      res.json({ message, data: user })
    })
    .catch(error => {
      const message = 'L\'utilisateur n\'a pas pu être récupéré. Réessayez dans quelques instants'
      res.status(500).json({ message, data: error })
      console.log(`Il y a eu une erreur : ${error}`)
    })
}

exports.getUserById = (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => {
      const message = 'L\'utilisateur a bien été récupéré.'
      res.json({ message, data: user })
    })
    .catch(error => {
      const message = 'L\'utilisateur n\'a pas pu être récupéré. Réessayez dans quelques instants'
      res.status(500).json({ message, data: error })
      console.log(`Il y a eu une erreur : ${error}`)
    })
}

exports.modifyUser = (req, res, next) => {

  const userObject = req.file ? {
    ...JSON.parse(req.body.user),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : req.body

  //Si l'utilisateur indique un id dans son POST, on le supprime
  //pour que cela n'interfère pas avec l'auto-incrémentation de la base de donnée
  if (userObject.id) {
    delete userObject.id
  }
  const id = req.params.id
  User.findByPk(id)
    .then(user => {
      if (user === null) {
        const message = 'L\'utilisateur demandé n\'existe pas. Réessayez avec un autre identifiant'
        return res.status(404).json({ message })
      }
      //Check with token if it belongs to the right user
      if (user.id != req.auth.userId) {
        const message = `Vous n'êtes pas autorisé à modifier cet utilisateur`
        return res.status(401).json({ message })
      }
      User.update(userObject, {
        where: { id: id }
      })
        .then(_ => {
          const message = `L\'utilisateur ${user.pseudo} a bien été modifié.`
          res.json({ message, data: user })
        })
    })
    .catch(error => {
      const message = 'L\'utilisateur n\'a pas pu être modifié. Réessayez dans quelques instants'
      res.status(500).json({ message, data: error })
      console.log(`Il y a eu une erreur : ${error}`)
    })
}

exports.deleteUser = (req, res, next) => {
  User.findByPk(req.params.id).then(user => {
    if (user === null) {
      const message = 'L\'utilisateur demandé n\'existe pas. Réessayez avec un autre identifiant'
      return res.status(404).json({ message })
    }
    const userDeleted = user;
    const filename = user.imageUrl.split('/images/')[1]
    fs.unlink(`images/${filename}`, () => {
      return User.destroy({
        where: { id: user.id }
      })
        .then(_ => {
          const message = `L'utilisateur avec l'identifiant n°${userDeleted.id} a bien été supprimé.`
          res.json({ message, data: userDeleted })
        })
    })
  })
    .catch(error => {
      const message = 'L\'utilisateur n\'a pas pu être supprimé. Réessayez dans quelques instants'
      res.status(500).json({ message, data: error })
      console.log(`Il y a eu une erreur : ${error}`)
    })
}


exports.signUp = (req, res, next) => {
  if (!req.body.password) {
    const message = `Un mot de passe est nécessaire`
    return res.status(400).json({ message })
  }
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      return User.create({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash
      })
        .then(user => {
          const message = `L\'utilisateur ${req.body.pseudo} a bien été créé.`
          res.json({ message, data: user })
        })
    })
    .catch(error => {
      if (error instanceof UniqueConstraintError) {
        console.log(error)
        return res.status(401).json({ message: error.message })
      }
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message })
      }
      const message = 'L\'utilisateur n\'a pas pu être enregistré. Réessayez dans quelques instants'
      res.status(500).json({ message })
      console.log(`Il y a eu une erreur : ${error}`)
    })
}

exports.login = (req, res, next) => {
  if(!req.body.email){
    const message = `Un email est nécessaire`
    return res.status(400).json({ message })
  }
  if (!req.body.password) {
    const message = `Un mot de passe est nécessaire`
    return res.status(400).json({ message })
  }
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Cet utilisateur n\'existe pas.' })
      }
      return bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Le mot de passe est incorrect' });
          }
          const message = `L\'utilisateur ${user.pseudo} est bien connecté.`

          //On place le token dans un cookie
          res.cookie('groupomania-jwt', jwt.sign(
            { userId: user.id },
            'GROUPOMANIA_SECRET_TOKEN',
            { expiresIn: '24h' }
          ), { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })

          res.status(200).json({ message })
        })
    })
    .catch(error => {
      const message = 'L\'utilisateur n\'a pas pu être loggé. Réessayez dans quelques instants'
      res.status(500).json({ message, data: error })
      console.log(`Il y a eu une erreur : ${error}`)
    })

}

exports.logout = (req, res, next) => {
  res.clearCookie('groupomania-jwt')
  res.status(200).json({ message: 'Vous êtes déconnecté' })
}