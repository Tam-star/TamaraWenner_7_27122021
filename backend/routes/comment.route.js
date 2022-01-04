const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const commentCtrl = require('../controllers/comment.controller')

router.get('/', auth, commentCtrl.getAllComments)
router.get('/:id', auth, commentCtrl.getCommentById)
router.post('/', auth, multer, commentCtrl.createComment)
router.put('/:id', auth, multer, commentCtrl.modifyComment)
router.delete('/:id', auth, commentCtrl.deleteComment)


module.exports = router