import Mongoose = require("mongoose");

interface IMovieGenreModel extends Mongoose.Document {
    genreId: Number;
    genreName: string;
    movies: [Number];
}
export {IMovieGenreModel};