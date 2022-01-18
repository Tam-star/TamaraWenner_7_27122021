const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-users');
const limiter = require('../middlewares/rate-limit');
const userCtrl = require('../controllers/user.controller')

router.get('/', auth, userCtrl.getAllUsers)
router.get('/logout', userCtrl.logout)
router.get('/:id', auth, userCtrl.getUserById)
router.post('/signup', userCtrl.signUp)
router.post('/login', limiter, userCtrl.login)
router.put('/:id', auth, multer, userCtrl.modifyUser)
router.delete('/:id', auth, userCtrl.deleteUser)


module.exports = router