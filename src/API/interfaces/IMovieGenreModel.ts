import Mongoose = require("mongoose");

interface IMovieGenreModel extends Mongoose.Document {
    id: string;
    tmdb_id: Number;
    genreName: string;
    movies: [Number];
}
export {IMovieGenreModel};