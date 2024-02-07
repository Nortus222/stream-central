import Mongoose = require("mongoose");

interface IMovieModel extends Mongoose.Document {
    movieId: string;
    movieTitle: string;
    movieGenres: [{
        genreId: string;
    }];
    actors: [{
        actorName:string;
    }];
    movieDirector: string;
    movieDescription: string;
    movieRatings: [{
        sourceId: string;
        sourceName: string;
        rating: number;
    }];
    imageFileName: string;
    releaseYear: number;
    budget: number;
    producers: [{
        producerName: string;
    }];
    streamingServiceProviders: [{
        name: string;
        status: string;   // "Paid no ads", "Paid ads", "Free ads", "Free no ads"
    }];
}
export {IMovieModel};