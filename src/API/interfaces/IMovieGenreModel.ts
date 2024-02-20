import Mongoose = require("mongoose");

interface IMovieGenreModel extends Mongoose.Document {
    _id: Mongoose.Types.ObjectId;
    genreId: string
    tmdb_id: Number;
    genreName: string;
    movies: string[];
}
export {IMovieGenreModel};