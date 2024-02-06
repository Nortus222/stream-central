const fs = require('fs');

db = db.getSiblingDB('sampledb')
db.createCollection('movies')
moviesCollection = db.getCollection("movies")
moviesCollection.remove({})

const data = JSON.parse(fs.readFileSync('tmdb_sample.json', 'utf8'));

moviesCollection.insertMany(data);
