const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post.controller')

router.get('/', postCtrl.getAllPosts)
router.get('/:id', postCtrl.getPostById)
router.post('/', postCtrl.createPost)
router.put('/:id', postCtrl.modifyPost)
router.delete('/:id', postCtrl.deletePost)



module.exports = router