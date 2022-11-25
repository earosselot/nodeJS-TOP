const express = require('express')
const userRouter = express.Router()
const { userSanitizationsChecksAndValidation } = require('./UserSanitizers')
const passport = require('../authentication/passport')


const UserController = require('./UserController')
const userController = new UserController()

userRouter.get('/sign-up', userController.signUpForm)
userRouter.post('/', userSanitizationsChecksAndValidation, userController.createUser)

userRouter.get('/login', (req, res) => res.render('user/log-in-form', { errors: [] }))
userRouter.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/'
	})
)
userRouter.get('/join-club', userController.joinClubForm)
userRouter.post('/validate-key', userController.validateKey)

userRouter.get('/become-admin', userController.becomeAdminForm)
userRouter.post('/validate-admin-key', userController.validateAdminKey)

module.exports = userRouter
