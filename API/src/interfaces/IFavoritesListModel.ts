import Mongoose = require("mongoose");

interface IFavoritesModel extends Mongoose.Document {
    favoritesListId: string;
    userId: string;
    movies: [ {
        movieId: string;
    }];
}
export {IFavoritesModel};