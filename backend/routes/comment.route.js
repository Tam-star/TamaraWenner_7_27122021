const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const commentCtrl = require('../controllers/comment.controller')

router.get('/:postId/all', auth, commentCtrl.getAllCommentsForOnePost) 
router.get('/:id', auth, commentCtrl.getCommentById)
router.post('/:postId', auth, multer, commentCtrl.createComment)
router.put('/:id', auth, multer, commentCtrl.modifyComment)
router.delete('/:id', auth, commentCtrl.deleteComment)


module.exports = router