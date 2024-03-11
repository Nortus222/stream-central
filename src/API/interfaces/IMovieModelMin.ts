import Mongoose = require("mongoose");

interface IMovieModelMin extends Mongoose.Document {
    tmdb_id: { type: Number, required: true },
    title: String,
    poster: String,
}
export {IMovieModelMin};