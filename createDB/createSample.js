const fs = require('fs');

db = db.getSiblingDB('sampledb')

// Populate the database with sample movies
db.createCollection('movies')
moviesCollection = db.getCollection("movies")
moviesCollection.deleteMany({})

const data = JSON.parse(fs.readFileSync('tmdb_sample_movies.json', 'utf8'));

moviesCollection.insertMany(data);

// Populate the database with sample genres
db.createCollection('movieGenres')
genresCollection = db.getCollection("movieGenres")
genresCollection.deleteMany({})

const genres = JSON.parse(fs.readFileSync('tmdb_sample_genres.json', 'utf8'));

genresCollection.insertMany(genres);

// Populate the database with sample users
db.createCollection('users')
usersCollection = db.getCollection("users")
usersCollection.deleteMany({})

usersCollection.insertMany([
  {
    "username": "user1",
    "password": "password1",
    "email": "test1@gmail.com",
  },
  {
    "username": "user2",
    "password": "password2",
    "email": "test2@gmail.com",
  },
]);

// Populate the database with sample favorites
db.createCollection('favorites')
favoritesCollection = db.getCollection("favorites")
favoritesCollection.deleteMany({})

const movies = moviesCollection.find({},).limit(3).toArray();
const user = usersCollection.findOne({},);

favoritesCollection.insertMany([
  {
    "userId": user._id,
    "movies": [movies[0]._id, movies[2]._id],
  },
]);
