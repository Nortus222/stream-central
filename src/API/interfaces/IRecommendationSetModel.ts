import Mongoose = require("mongoose");

interface IRecommendationSetModel extends Mongoose.Document {
    id: string;
    userId: string;
    recommendedMovies: string[];
}
export {IRecommendationSetModel};