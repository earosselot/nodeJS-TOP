const User = require('./User')
const bcrypt = require('bcryptjs')

class UserSystem {
	constructor() {}

	addUser(firstName, lastName, email, password) {
		const hashedPassword = bcrypt.hashSync(password, 10)

		new User({ firstName, lastName, email, password: hashedPassword }).save((err) => {
			if (err) throw err
		})
	}

	async findByEmail(email) {
		return await User.findOne({ email: email }).exec()
	}

	async findById(id) {
		return await User.findById(id).exec()
	}
}

module.exports = UserSystem
