const { User } = require('../config/db')

exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then(users => {
      const message = 'La liste des utilisateurs a bien été récupérée.'
      res.json({ message, data: users })
    })
    .catch(error => console.log(`Il y a eu une erreur : ${error}`))

}