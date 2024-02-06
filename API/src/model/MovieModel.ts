import * as Mongoose from "mongoose";
import { IMovieModel } from "../interfaces/IMovieModel";

class MovieModel {
    public schema: any;
    public model: any;
    public dbConnectionString: string;

    public constructor(DB_CONNECTION_STRING: string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema({
            movieId: String,
            movieTitle: String,
            genreIds: [{
                genreId: String,
                genreName: String,
            }],
            actors: [{
                actorName: String,
            }],
            movieDirector: String,
            movieDescription: String,
            movieRatings: [{
                source: String,
                rating: Number,
            }],
            imageFileName: String,
            releaseYear: Number,
            budget: Number,
            producers: [{
                producerName: String,
            }],
            streamingServiceProviders: [{
                name: String,
                status: String,
            }],
            gross: Number,
        }, {collection: 'movies'});
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as Mongoose.ConnectOptions);
            this.model = Mongoose.model<IMovieModel>("Movie", this.schema);    
        }
        catch (e) {
            console.error(e);        
        }
    }

    public async getMovie(response: any, movieId: string) {
        var query = this.model.findOne({movieId: movieId});
        try {
            const movie = await query.exec();
            if (movie) {
                response.status(200).json(movie);
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async getMovieRatings(response: any, movieId: string) {
        var query = this.model.findOne({movieId: movieId});
        try {
            const movie = await query.exec();
            if (movie) {
                response.status(200).json(movie.movieRatings);
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async getMovieImage(response: any, movieId: string) {
        var query = this.model.findOne({movieId: movieId});
        try {
            const movie = await query.exec();
            if (movie) {
                response.status(200).json({imageFileName: movie.imageFileName});
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async getStreamingService(response: any, movieId: string) {
        var query = this.model.findOne({movieId: movieId});
        try {
            const movie = await query.exec();
            if (movie) {
                response.status(200).json(movie.streamingServiceProviders);
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async getMovieTitle(response: any, movieId: string) {
        var query = this.model.findOne({movieId: movieId});
        try {
            const movie = await query.exec();
            if (movie) {
                response.status(200).json({movieTitle: movie.movieTitle});
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async getNumberOfMovies(response: any) {
        var query = this.model.countDocuments();
        try {
            const count = await query.exec();
            response.status(200).json({numberOfMovies: count});
        } catch (error) {
            response.status(500).send();
        }
    }

    public async getAllMoviesMeetingCriteria(response: any, criteria: any) {
        var query = this.model.find(criteria);
        try {
            const movies = await query.exec();
            if (movies) {
                response.status(200).json(movies);
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    // Update functions
    public async updateRating(response: any, movieId: string, ratingProvider: string, newRating: number) {
        var query = this.model.findOne({movieId: movieId});
        try {
            let movie = await query.exec();
            if (movie) {
                movie.streamingServiceProviders.push({source: ratingProvider, rating: newRating});
                await movie.save();
                response.status(200);
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async updateGrossing(response: any, movieId: string, newAmount: number) {
        var query = this.model.findOne({movieId: movieId});
        try {
            let movies = await query.exec();
            if (movies) {
                movies.psuh({gross: newAmount});
                response.status(200);
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    // Delete functions
    public async deleteMovie(response: any, movieId: string) {
        var query = this.model.findOne({movieId: movieId});
        try {
            let movie = await query.exec();
            if (movie) {
                movie.deleteOne({movieId: movieId});
                response.status(200);
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }
}

export {MovieModel};
