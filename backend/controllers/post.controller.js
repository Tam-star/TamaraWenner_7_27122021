const { Post } = require('../config/db')

exports.getAllPosts = (req, res, next) => {
  Post.findAll()
    .then(posts => {
      const message = 'La liste des posts a bien été récupérée.'
      res.json({ message, data: posts })
    })
    .catch(error => console.log(`Il y a eu une erreur : ${error}`))
}

exports.getPostById = (req, res, next) => {
  Post.findByPk(req.params.id)
    .then(post => {
      const message = 'Le post a bien été récupéré.'
      res.json({ message, data: post })
    })
    .catch(error => console.log(`Il y a eu une erreur : ${error}`))
}

exports.createPost = (req, res, next) => {
    Post.create(req.body)
      .then(post => {
        const message = `Le post a bien été créé.`
        res.json({ message, data: post })
      })
      .catch(error => console.log(`Il y a eu une erreur : ${error}`))
  }
  

exports.modifyPost = (req, res, next) => {
  const id = req.params.id
  Post.update(req.body, {
    where: { id: id }
  })
    .then(_ => {
      Post.findByPk(id).then(post => {
        const message = `Le post a bien été modifié.`
        res.json({ message, data: post })
      })
    })
}

exports.deletePost = (req, res, next) => {
  Post.findByPk(req.params.id).then(post => {
    const postDeleted = post;
    Post.destroy({
      where: { id: post.id }
    })
      .then(_ => {
        const message = `Le post avec l'identifiant n°${postDeleted.id} a bien été supprimé.`
        res.json({ message, data: postDeleted })
      })
  })
}


