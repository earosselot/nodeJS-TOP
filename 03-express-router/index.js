const express = require('express')
const logger = require('morgan')
const wiki = require('./wiki')
const app = express()
const port = 8080

app.use(logger('dev'))

app.get('/', (req, res) => {
	res.send('Main page')
})

app.use('/wiki', wiki)

app.listen(port, () => {
	console.log(`Wiki listening on port ${port}`)
})
