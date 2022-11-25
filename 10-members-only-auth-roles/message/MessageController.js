const MessageSystem = require('./MessageSystem')

class MessageController {
	constructor() {}

	newMessageForm(req, res) {
		res.render('message/new-message-form')
	}

	async homeMessageBoard(req, res) {
		const messageSystem = new MessageSystem()
		const messages = await messageSystem.getAll()
		res.render('home', { user: req.user, messages })
	}

	async createMessage(req, res, next) {
		const { text } = req.body
		const { user } = req
		const messageSystem = new MessageSystem()
		try {
			if (user) {
				await messageSystem.createMessage(text, user)
				res.redirect('/')
			} else {
				next(new Error('Only users can create messages'))
			}
		} catch (error) {
			next(error)
		}
	}

	async deleteMessage(req, res, next) {
		const { messageId } = req.body
		const messageSystem = new MessageSystem()
		try {
			await messageSystem.deleteMessage(messageId)
			res.redirect('/')
		} catch (error) {
			next(error)
		}
	}
}

module.exports = MessageController
