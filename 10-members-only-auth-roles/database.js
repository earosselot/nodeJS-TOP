const mongoose = require('mongoose')

function initialize() {
	const mongoDb = process.env.PROD_MONGODB_URI
	mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true })
	const db = mongoose.connection
	db.on('error', console.error.bind(console, 'mongo connection error'))
	db.on('connected', () => console.log('DB Connected'))
}

module.exports = { initialize }
