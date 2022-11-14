const User = require('./User')

class UserController {
	createUser(req, res, next) {
		const { firstName, lastName, email, password } = req.body

		// esto no es responsabilidad del controller
		const hashedPassword = bcrypt.hashSync(password, 10)
		new User({
			firstName,
			lastName,
			email,
			hashedPassword
		}).save(
			// esto es responsabilidad del controller
			(err) => {
				if (err) next(err)
				res.redirect('/')
			}
		)
	}
}

module.exports = UserController
