const express = require('express')
const messageRouter = express.Router()

const MessageController = require('./MessageController')
const messageController = new MessageController()

messageRouter.get('/new-message', messageController.newMessageForm)
messageRouter.get('/', messageController.homeMessageBoard)

messageRouter.post('/', messageController.createMessage)
messageRouter.post('/delete', messageController.deleteMessage)

module.exports = messageRouter
