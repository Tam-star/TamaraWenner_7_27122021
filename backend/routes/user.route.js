const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const userCtrl = require('../controllers/user.controller')

router.get('/', auth, userCtrl.getAllUsers)
router.get('/:id', auth, userCtrl.getUserById)
router.post('/', userCtrl.signUp)
router.post('/:id', userCtrl.login)
router.put('/:id', auth, multer, userCtrl.modifyUser)
router.delete('/:id', auth, userCtrl.deleteUser)


module.exports = router