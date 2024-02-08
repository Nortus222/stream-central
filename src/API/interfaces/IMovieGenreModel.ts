import Mongoose = require("mongoose");

interface IMovieGenreModel extends Mongoose.Document {
    _id: Mongoose.Types.ObjectId;
    tmdb_id: Number;
    genreName: string;
    movies: [Number];
}
export {IMovieGenreModel};