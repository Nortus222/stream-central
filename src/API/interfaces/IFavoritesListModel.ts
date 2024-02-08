import Mongoose = require("mongoose");

interface IFavoritesModel extends Mongoose.Document {
    userId: string;
    movies: [Number];
}
export {IFavoritesModel};