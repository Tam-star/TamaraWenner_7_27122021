const express = require('express')
const { route } = require('express/lib/router')
const router = express.Router()

const userCtrl = require('../controllers/user.controller')

router.get('/', userCtrl.getAllUsers)


module.exports = router