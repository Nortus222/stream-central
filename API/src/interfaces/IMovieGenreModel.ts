import Mongoose = require("mongoose");

interface IMovieGenreModel extends Mongoose.Document {
    genreId: string;
    genreName: string;
    movies: [{
        movieId: string;
    }];
}
export {IMovieGenreModel};