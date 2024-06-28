const express = require('express')
const { signUp, signIn } = require('../controller/auth.controller')

const router = express.Router()

/** auth routers */

router.post('/post/signup' , signUp)
router.post('/post/signin' , signIn)

module.exports = router