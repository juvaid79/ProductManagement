const express = require('express')
const router = express.Router();
const { singup, login, home, changepass, forget } = require('../controller/controler')
router.post('/singup', singup)
router.post('/login', login)
router.get('/home', home)
router.post('/forget-password', forget)
router.post('/change-password', changepass)
module.exports = router;