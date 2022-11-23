const UserSystem = require('./UserSystem')

class UserController {
	createUser(req, res, next) {
		const { firstName, lastName, email, password } = req.body
		const userSystem = new UserSystem()
		try {
			userSystem.addUser(firstName, lastName, email, password)
			res.redirect('/')
		} catch (error) {
			next(error)
		}
	}

	login(req, res, next) {
		const { email, password } = req.body
		const userSystem = new UserSystem()

		try {
			userSystem.login(email, password)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = UserController
