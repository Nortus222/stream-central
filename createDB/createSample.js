const fs = require('fs');

db = db.getSiblingDB('sampledb')

// Populate the database with sample movies
db.createCollection('movies')
moviesCollection = db.getCollection("movies")
moviesCollection.remove({})

const data = JSON.parse(fs.readFileSync('tmdb_sample.json', 'utf8'));

moviesCollection.insertMany(data);

// Populate the database with sample genres
db.createCollection('movieGenres')
genresCollection = db.getCollection("movieGenres")
genresCollection.remove({})

const genres = JSON.parse(fs.readFileSync('tmdb_sample_genres.json', 'utf8'));

genresCollection.insertMany(genres);
