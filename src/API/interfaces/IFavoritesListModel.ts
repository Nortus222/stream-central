import Mongoose = require("mongoose");

interface IFavoritesModel extends Mongoose.Document {
    _id: Mongoose.Types.ObjectId;
    favoritesListId: string;
    userId: string;
    movies: string[];
}
export {IFavoritesModel};