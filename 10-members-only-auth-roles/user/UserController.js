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

	signUpForm(req, res) {
		res.render('user/sign-up-form', { errors: [] })
	}

	joinClubForm(req, res) {
		res.render('user/join-club-form', { user: req.user })
	}

	async validateKey(req, res, next) {
		const { clubKey } = req.body
		const { user } = req
		if (user && clubKey === 'SECRET') {
			const userSystem = new UserSystem()
			await userSystem.makeMember(user)
			res.redirect('/')
		} else {
			res.render('user/join-club-form', { user: req.user, invalidKey: 'true' })
		}
	}

	becomeAdminForm(req, res) {
		res.render('user/become-admin-form', { user: req.user })
	}

	async validateAdminKey(req, res, next) {
		const { clubAdminKey } = req.body
		const { user } = req
		if (user && clubAdminKey === 'ADMIN') {
			const userSystem = new UserSystem()
			await userSystem.makeAdmin(user)
			res.redirect('/')
		} else {
			res.render('user/become-admin-form', { user: req.user, invalidKey: 'true' })
		}
	}
}

module.exports = UserController
