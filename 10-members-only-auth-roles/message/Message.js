const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
	text: { type: String, required: true },
	author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	creationDate: { type: Date, default: Date.now() }
})

MessageSchema.virtual('showDate').get(function () {
	return this.creationDate.toLocaleString()
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message
