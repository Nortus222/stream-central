import Mongoose = require("mongoose");

interface IRecommendationSetModel extends Mongoose.Document {
    recommendationSetId: string;
    userId: string;
    recommendedMovies: [{
        movieId: string;
        movieTitle: string;    
    }];
}
export {IRecommendationSetModel};