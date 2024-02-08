import Mongoose = require("mongoose");

interface IFavoritesModel extends Mongoose.Document {
    _id: Mongoose.Types.ObjectId;
    userId: Mongoose.Types.ObjectId;
    movies: Mongoose.Types.ObjectId[];
}
export {IFavoritesModel};