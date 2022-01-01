const { User } = require('../config/db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
  const id = req.params.id
  User.update(req.body, {
    where: { id: id }
  })
    .then(_ => {
      return User.findByPk(id).then(user => {
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
    const userDeleted = user;
    return User.destroy({
      where: { id: user.id }
    })
      .then(_ => {
        const message = `L'utilisateur avec l'identifiant n°${userDeleted.id} a bien été supprimé.`
        res.json({ message, data: userDeleted })
      })
  })
    .catch(error => {
      const message = 'L\'utilisateur n\'a pas pu être supprimé. Réessayez dans quelques instants'
      res.status(500).json({ message, data: error })
      console.log(`Il y a eu une erreur : ${error}`)
    })
}


exports.signUp = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      return User.create({
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
      const message = 'L\'utilisateur n\'a pas pu être enregistré. Réessayez dans quelques instants'
      res.status(500).json({ message, data: error })
      console.log(`Il y a eu une erreur : ${error}`)
    })
}

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Cet utilisateur n\'existe pas.' })
      }
      return bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Incorrect password !' });
          }
          const message = `L\'utilisateur ${user.pseudo} est bien connecté.`
          //res.json({ message, data: user })
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
              'GROUPOMANIA_SECRET_TOKEN',
              { expiresIn: '24h' }
            )
          })
        })
      //Check password with bcrypt, utilisation du jwt token
    })
    .catch(error => {
      const message = 'L\'utilisateur n\'a pas pu être loggé. Réessayez dans quelques instants'
      res.status(500).json({ message, data: error })
      console.log(`Il y a eu une erreur : ${error}`)
    })

}
