import Mongoose = require("mongoose");

interface IFavoritesModel extends Mongoose.Document {
    id: string
    userId: string;
    movies: string[];
}
export {IFavoritesModel};