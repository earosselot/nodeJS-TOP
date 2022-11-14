const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Message = mongoose.model(
	'Message',
	new Schema({
		title: { type: String, required: true },
		text: { type: String, required: true },
		author: { type: String, required: true },
		timestamp: { type: String, default: Date.now() }
	})
)

module.exports = Message
