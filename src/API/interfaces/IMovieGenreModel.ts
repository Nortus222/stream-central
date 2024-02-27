import Mongoose = require("mongoose");

interface IMovieGenreModel extends Mongoose.Document {
    id: string;
    tmdb_id: Number;
    genreName: string;
    movies: [String];
}
export {IMovieGenreModel};