var express = require('express')
var app = express()
var MongoClient = require('mongodb').MongoClient

var dbo
MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
  if (err) throw err
  dbo = db.db('mapadb')
})

app.get('/', function (req, res) {
  res.send('Bienvenido a Mapa')
})

app.get('/places', function (req, res) {
  var places = dbo.collection('places').find().toArray(function (err, response) {
    res.send(response)
  })
})

app.listen(3000)