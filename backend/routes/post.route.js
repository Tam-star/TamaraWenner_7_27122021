const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-posts');
const postCtrl = require('../controllers/post.controller')

router.get('/', auth, postCtrl.getAllPosts)
router.get('/:id', auth, postCtrl.getPostById)
router.post('/', auth, multer, postCtrl.createPost)
router.put('/:id', auth, multer, postCtrl.modifyPost)
router.delete('/:id', auth, postCtrl.deletePost)

router.post('/:id/like', auth, postCtrl.postLike)


module.exports = router