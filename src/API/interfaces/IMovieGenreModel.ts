import Mongoose = require("mongoose");

interface IMovieGenreModel extends Mongoose.Document {
    tmdb_id: Number;
    genreName: string;
    movies: [Number];
}
export {IMovieGenreModel};