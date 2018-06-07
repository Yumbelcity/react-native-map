var mongo = require('mongodb')
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/"

MongoClient.connect(url, function (err, db) {
  if (err) throw err
  var dbo = db.db('mapadb')
  var places = [
    { name: 'Constanera Center', coords: [-33.417994, -70.6066896] },
    { name: 'TVN', coords: [-33.42724, -70.6248701] },
    { name: 'Cerro San Cristóbal', coords: [-33.4253257, -70.6332386] },
  ]
  dbo.collection('places').insertMany(places, function (err, res) {
    if (err) throw err
    console.log(`Number of documents inserted: ${res.insertedCount}`)
    db.close()
  })
})