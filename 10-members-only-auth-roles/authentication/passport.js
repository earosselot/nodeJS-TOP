const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const UserSystem = require('../user/UserSystem')

const strategy = new LocalStrategy(async function verify(username, password, done) {
	const userSystem = new UserSystem()
	let user
	try {
		user = await userSystem.findByEmail(username)
		console.log(user)
	} catch (error) {
		done(error)
	}

	if (!user) {
		return done(null, false, { message: 'invalid username' })
	}
	const passwordMatches = bcrypt.compareSync(password, user.password)
	if (!passwordMatches) {
		return done(null, false, { message: 'invalid password' })
	}
	return done(null, user)
})

passport.use(strategy)

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
	const userSystem = new UserSystem()
	try {
		const user = await userSystem.findById(id)
		done(null, user)
	} catch (error) {
		done(error, null)
	}
})

module.exports = passport
