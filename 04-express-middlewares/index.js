const express = require('express')
const app = express()

const middlewareFunction = function (req, res, next) {
	res.setHeader('middleware1', 'true')
	next()
}

const middlewareFunction2 = function (req, res, next) {
	res.setHeader('middleware2', 'true')
	next()
}

const middlewareFunction3 = async function (req, res, next) {
	res.setHeader('middleware3', 'true')
	next()
}

app.use(middlewareFunction)

app.use('/some-route', middlewareFunction2)

app.get('/', middlewareFunction3)

app.get('/broken', (req, res) => {
	throw new Error('broken route')
})

app.use((req, res) => {
	res.send('success')
})

app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send('Something broke!')
})

app.listen(8080)
