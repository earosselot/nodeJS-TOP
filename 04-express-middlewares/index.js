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

app.use((req, res) => {
	res.send('success')
})

app.listen(8080)
