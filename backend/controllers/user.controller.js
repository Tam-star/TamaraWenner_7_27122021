const { User } = require('../config/db')

exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then(users => {
      const message = 'La liste des utilisateurs a bien été récupérée.'
      res.json({ message, data: users })
    })
    .catch(error => console.log(`Il y a eu une erreur : ${error}`))
}

exports.getUserById = (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => {
      const message = 'L\'utilisateur a bien été récupéré.'
      res.json({ message, data: user })
    })
    .catch(error => console.log(`Il y a eu une erreur : ${error}`))
}

exports.modifyUser = (req, res, next) => {
  const id = req.params.id
  User.update(req.body, {
    where: { id: id }
  })
    .then(_ => {
      User.findByPk(id).then(user => {
        const message = `L\'utilisateur ${user.pseudo} a bien été modifié.`
        res.json({ message, data: user })
      })
    })
}

exports.deleteUser = (req, res, next) => {
  User.findByPk(req.params.id).then(user => {
    const userDeleted = user;
    User.destroy({
      where: { id: user.id }
    })
      .then(_ => {
        const message = `L'utilisateur avec l'identifiant n°${userDeleted.id} a bien été supprimé.`
        res.json({ message, data: userDeleted })
      })
  })
}


exports.signUp = (req, res, next) => {
  User.create(req.body)
    .then(user => {
      const message = `L\'utilisateur ${req.body.pseudo} a bien été créé.`
      res.json({ message, data: user })
    })
    .catch(error => console.log(`Il y a eu une erreur : ${error}`))
}

exports.login = (req, res, next) => {
  User.findByPk({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'This user does not exist' })
      }
      //Check password with bcrypt, utilisation du jwt token 
      const message = `L\'utilisateur ${req.body.pseudo} est bien connecté.`
      res.json({ message, data: user })
    })
}
