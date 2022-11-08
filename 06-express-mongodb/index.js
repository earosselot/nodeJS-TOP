const express = require('express')
const app = express()

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:8081/animals', (err, client) => {
	if (err) throw err

	const db = client.db('animals')
	db.collection('mamals')
		.find()
		.toArray((err, result) => {
			if (err) throw err
			console.log(result)
		})
})
