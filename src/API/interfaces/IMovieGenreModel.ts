import Mongoose = require("mongoose");

interface IMovieGenreModel extends Mongoose.Document {
    genreId: Number;
    genreName: string;
    movies: [{
        movieId: Number;
        movieTitle: string;
    }];
}
export {IMovieGenreModel};