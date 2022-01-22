const { User, Post, Comment } = require('../config/db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const fsPromises = require("fs/promises");
const { ValidationError, UniqueConstraintError } = require('sequelize');


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


//To get info from other persons
exports.getUserById = (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Cet utilisateur n\'existe pas.' })
      }
      console.log('auth', req.auth.userId)
      //Depending on which user is asking, we don't send the same information
      if (req.auth.userId == req.params.id) {
        const message = 'L\'utilisateur a bien été récupéré.'
        const myData = {
          id: user.id,
          lastname: user.lastname,
          firstname: user.firstname,
          pseudo: user.pseudo,
          email: user.email,
          bio: user.bio,
          imageUrl: user.imageUrl,
          rights : user.rights,
          sameUser: true
        }
        res.json({ message, data: myData })
      }
      else {
        const message = 'L\'utilisateur a bien été récupéré.'
        const dataOfOtherUser = {
          id: user.id,
          lastname: user.lastname,
          firstname: user.firstname,
          pseudo: user.pseudo,
          bio: user.bio,
          imageUrl: user.imageUrl,
          sameUser: false
        }
        res.json({ message, data: dataOfOtherUser })
      }

    })
    .catch(error => {
      const message = 'L\'utilisateur n\'a pas pu être récupéré. Réessayez dans quelques instants'
      res.status(500).json({ error: message })
      console.log(`Il y a eu une erreur : ${error}`)
    })
}


exports.modifyUser = async (req, res, next) => {

  try {

    const userObject = req.file ? {
      ...JSON.parse(req.body.user),
      imageUrl: `${req.protocol}://${req.get('host')}/images/users/${req.file.filename}`
    } : req.body


    if (userObject.id) {
      delete userObject.id // To prevent interfering with auto-increment
    }
    if (userObject.rights) {
      delete userObject.rights //To prevent someone from updating his or her rights (becoming a moderator)
    }

    const id = req.params.id

    if (userObject.password) {
      const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
      if (!strongRegex.test(userObject.password)) {
        const message = `Le mot de passe doit contenir au moins 8 caractères, dont un chiffre, une lettre majuscule, une lettre minuscule et un caractère spécial (!@#$%^&*)`
        return res.status(400).json({ error: message })
      }
      const hash = await bcrypt.hash(userObject.password, 10)
      userObject.password = hash
    }
    const user = await User.findByPk(id)
    if (user === null) {
      const message = 'L\'utilisateur demandé n\'existe pas. Réessayez avec un autre identifiant'
      return res.status(404).json({ error: message })
    }
    //Check with token if it belongs to the right user
    if (user.id != req.auth.userId) {
      const message = `Vous n'êtes pas autorisé à modifier cet utilisateur`
      return res.status(401).json({ error: message })
    }

    //In case there is a replacing profile picture or no more profile picture
    if (user.imageUrl && (req.file || userObject.imageUrl === null)) {
      const filename = user.imageUrl.split('/images/users/')[1]
      await fsPromises.unlink(`images/users/${filename}`)
    }

    await User.update(userObject, {
      where: { id: id }
    })

    const message = `L\'utilisateur ${user.pseudo} a bien été modifié.`
    res.json({ message })
  }
  catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message })
    }
    const message = 'L\'utilisateur n\'a pas pu être modifié. Réessayez dans quelques instants'
    res.status(500).json({ error: message })
    console.log(`Il y a eu une erreur : ${error}`)
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (user === null) {
      const message = 'L\'utilisateur demandé n\'existe pas. Réessayez avec un autre identifiant'
      return res.status(404).json({ message })
    }
    //Check with token if it belongs to the right user
    if (user.id != req.auth.userId) {
      const message = `Vous n'êtes pas autorisé à modifier cet utilisateur`
      return res.status(401).json({ message })
    }
    const userDeleted = user;
    //In case there is a profile picture
    if (user.imageUrl) {
      const filename = user.imageUrl.split('/images/users/')[1]
      await fsPromises.unlink(`images/users/${filename}`)
    }
    //First we destroy all the comments linked to the user
    await Comment.destroy({
      where: { userId: user.id }
    })
    console.log('Suppression de tous les commentaires écrits par le user')
    //Then we look for all the posts written by the user 
    const postList = await Post.findAll({
      where: { userId: user.id }
    })
    console.log('Tous les posts écrits par le user ont été récupérés')
    //On détruit tous les commentaires des posts écrits par l'utilisateur
    await Promise.all(postList.map(post => Comment.destroy({ where: { postId: post.id } })))
    console.log('Tous les commentaires de tous les posts écrits par le user ont été supprimés')
    //Puis on détruit tous les posts écrits par l'utilisateur
    await Promise.all(postList.map(post => {
      if (post.imageUrl) {
        const postFilename = post.imageUrl.split('/images/posts/')[1]
        fsPromises.unlink(`images/posts/${postFilename}`)
      }
      Post.destroy({ where: { id: post.id } })
    }))
    console.log("Tous les posts de l'utilisateur ont bien été supprimés")
    //On veut aussi supprimer tous les likes de l'utilisateur
    const postLikeList = await Post.findAll()
    await Promise.all(postLikeList.map(post => {
      let arrayUsersLiked = post.usersLiked == '' ? [] : post.usersLiked.split(',')
      if (arrayUsersLiked.includes(req.params.id)) {
        let index = arrayUsersLiked.indexOf(req.params.id)
        arrayUsersLiked.splice(index, 1)
        let stringUsersLiked = arrayUsersLiked.join(',')
        Post.update({ usersLiked: stringUsersLiked }, { where: { id: post.id } })
      }
    }))
    //On peut enfin supprimer notre utilisateur
    await User.destroy({
      where: { id: user.id }
    })
    const message = `L'utilisateur ${userDeleted.pseudo} a bien été supprimé.`
    res.clearCookie('groupomania-jwt')
    res.json({ message })


  } catch (error) {
    const message = 'L\'utilisateur n\'a pas pu être supprimé. Réessayez dans quelques instants'
    res.status(500).json({ message, data: error })
    console.log(`Il y a eu une erreur : ${error}`)
  }
}


exports.signUp = (req, res, next) => {
  //To prevent error with bcrypt hash
  if (!req.body.password) {
    const message = `Un mot de passe est nécessaire`
    return res.status(400).json({ error: message })
  }

  const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
  if (!strongRegex.test(req.body.password)) {
    const message = `Le mot de passe doit contenir au moins 8 caractères, dont un chiffre, une lettre majuscule, une lettre minuscule et un caractère spécial (!@#$%^&*)`
    return res.status(400).json({ error: message })
  }


  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      //On ne met pas les droits pour ne pas que quelqu'un s'auto-déclare "moderator" ou "superadmin"
      return User.create({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash
      })
        .then(user => {
          const message = `L\'utilisateur ${req.body.pseudo} a bien été créé.`
          console.log('Data user : ', user.toJSON())
          res.json({ message })
        })
    })
    .catch(error => {
      if (error instanceof UniqueConstraintError) {
        console.log(error)
        return res.status(401).json({ error: error.message })
      }
      if (error instanceof ValidationError) {
        return res.status(400).json({ error: error.message })
      }
      const message = 'L\'utilisateur n\'a pas pu être enregistré. Réessayez dans quelques instants'
      res.status(500).json({ error: message })
      console.log(`Il y a eu une erreur : ${error}`)
    })
}

exports.login = (req, res, next) => {
  //Check if there is an email in request
  if (!req.body.email) {
    const message = `Un email est nécessaire`
    return res.status(400).json({ error: message })
  }
  //Check if there is a password in request
  if (!req.body.password) {
    const message = `Un mot de passe est nécessaire`
    return res.status(400).json({ error: message })
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
          //On renvoie le userId
          const data = { userId: user.id }
          //On place le token dans un cookie
          res.cookie('groupomania-jwt', jwt.sign(
            {
              userId: user.id,
              userRights: user.rights
            },
            'GROUPOMANIA_SECRET_TOKEN',
            { expiresIn: '24h' }
          ), { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })

          res.status(200).json({ message, data })
        })
    })
    .catch(error => {
      const message = 'L\'utilisateur n\'a pas pu être loggé. Réessayez dans quelques instants'
      res.status(500).json({ message })
      console.log(`Il y a eu une erreur : ${error}`)
    })

}

exports.logout = (req, res, next) => {
  //On supprime le cookie de connexion chez le client
  res.clearCookie('groupomania-jwt')
  res.status(200).json({ message: 'Vous êtes déconnecté' })
}
