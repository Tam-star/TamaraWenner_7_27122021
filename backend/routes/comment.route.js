const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth');
//const multer = require('../middlewares/multer-config');
const commentCtrl = require('../controllers/comment.controller')

router.get('/:postId/all', auth, commentCtrl.getAllCommentsForOnePost) 
router.get('/:id', auth, commentCtrl.getCommentById)
router.post('/', auth, commentCtrl.createComment)
router.put('/:id', auth, commentCtrl.modifyComment)
router.delete('/:id', auth, commentCtrl.deleteComment)


module.exports = router