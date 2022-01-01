const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user.controller')

router.get('/', userCtrl.getAllUsers)
router.get('/:id', userCtrl.getUserById)
router.post('/', userCtrl.signUp)
router.post('/:id', userCtrl.login)
router.put('/:id', userCtrl.modifyUser)
router.delete('/:id', userCtrl.deleteUser)



module.exports = router