const Message = require('./Message')

class MessageSystem {
	constructor() {}

	async createMessage(text, user) {
		try {
			await new Message({ text, author: user.id }).save()
		} catch (e) {
			throw e
		}
	}

	async getAll() {
		return await Message.find().populate('author', 'firstName lastName creationDate showDate')
	}

	async deleteMessage(messageId) {
		await Message.findByIdAndDelete(messageId)
	}

	/* 	async findByEmail(email) {
		return await User.findOne({ email: email }).exec()
	}

	async findById(id) {
		return await User.findById(id).exec()
	}

	async makeMember(user) {
		if (user.membershipStatus == 'Guest') {
			user.membershipStatus = 'Member'
			await user.save()
		}
	} */
}

module.exports = MessageSystem
