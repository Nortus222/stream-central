import Mongoose = require("mongoose");

interface IFavoritesModel extends Mongoose.Document {
    userId: string;
    movies: [ {
        movieId: string;
        movieTitle: string;
    }];
}
export {IFavoritesModel};