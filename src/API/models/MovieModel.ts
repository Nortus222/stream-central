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
        this.schema = new Mongoose.Schema(
            {
                _id: Mongoose.Schema.Types.ObjectId,
                budget: Number,
                genres: [
                    {
                        id: Number,
                        name: String
                    }
                ],
                tmdb_id: Number,
                imdb_id: String,
                original_language: String,
                original_title: String,
                overview: String,
                popularity: Number,
                poster_path: String,
                production_countries: [
                    {
                        iso_3166_1: String,
                        name: String
                    }
                ],
                release_date: String,
                revenue: Number,
                runtime: Number,
                spoken_languages: [
                    {
                        english_name: String,
                        iso_639_1: String,
                        name: String
                    }
                ],
                status: String,
                tagline: String,
                title: String,
                vote_average: Number,
                vote_count: Number,
                casts: {
                    cast: [
                        {
                            gender: Number,
                            id: Number,
                            name: String,
                            profile_path: String,
                            character: String,
                            order: Number
                        }
                    ],
                },
                keywords: {
                    keywords: [
                        {
                            id: Number,
                            name: String
                        }
                    ]
                },
                // ratings: [{
                //     sourceId: {
                //         type: String,
                //     },
                //     sourceName: {
                //         type: String,
                //     },
                //     rating: {
                //         type: Number,
                //     },
                // }],
                // streamingServiceProviders: [{
                //     name: String,
                //     status: String,
                // }],
            },
            { collection: "movies" }
        );
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            } as Mongoose.ConnectOptions);
            this.model = Mongoose.model<IMovieModel>("movies", this.schema); 
        }
        catch (e) {
            console.error(e);        
        }
    }

    public async retrieveAllMovies(response: any) {
        var query = this.model.find({});

        try {
            const items = await query.exec();
            if (items) {
                response.status(200).json(items);
            } else{
                response.status(404).send();
            }
        }
        catch (e) {
            console.error(e);
            response.status(500).send();
        }
    }

    public async retrieveMovieById(response: any, id: string) {
        var query = this.model.findOne({ _id: id });

        try {
            const item = await query.exec();
            if (item) {
                response.status(200).json(item);
            } else {
                response.status(404).send();
            }
        }
        catch (e) {
            console.error(e);
            response.status(500).send();
        }
    }

    public async retrieveMovieCount(response: any) {
        var query = this.model.estimatedDocumentCount();

        try {
            const numberOfItems = await query.exec();
            response.json(numberOfItems);
        }
        catch (e) {
            console.error(e);
        }
    }

    // public async getMovieRatings(response: any, movieId: string) {
    //     var query = this.model.findOne({movieId: movieId});
    //     try {
    //         const movie = await query.exec();
    //         if (movie) {
    //             response.status(200).json(movie.movieRatings);
    //         } else {
    //             response.status(404).send();
    //         }
    //     } catch (error) {
    //         response.status(500).send();
    //     }
    // }

    // public async getMovieImage(response: any, movieId: string) {
    //     var query = this.model.findOne({movieId: movieId});
    //     try {
    //         const movie = await query.exec();
    //         if (movie) {
    //             response.status(200).json({imageFileName: movie.imageFileName});
    //         } else {
    //             response.status(404).send();
    //         }
    //     } catch (error) {
    //         response.status(500).send();
    //     }
    // }

    // public async getStreamingService(response: any, movieId: string) {
    //     var query = this.model.findOne({movieId: movieId});
    //     try {
    //         const movie = await query.exec();
    //         if (movie) {
    //             response.status(200).json(movie.streamingServiceProviders);
    //         } else {
    //             response.status(404).send();
    //         }
    //     } catch (error) {
    //         response.status(500).send();
    //     }
    // }

    // public async getMovieTitle(response: any, movieId: string) {
    //     var query = this.model.findOne({movieId: movieId});
    //     try {
    //         const movie = await query.exec();
    //         if (movie) {
    //             response.status(200).json({movieTitle: movie.movieTitle});
    //         } else {
    //             response.status(404).send();
    //         }
    //     } catch (error) {
    //         response.status(500).send();
    //     }
    // }

    // Update functions
    // public async updateRating(response: any, movieId: string, ratingProvider: string, newRating: number) {
    //     var query = this.model.findOne({movieId: movieId});
    //     try {
    //         let movie = await query.exec();
    //         if (movie) {
    //             movie.streamingServiceProviders.push({source: ratingProvider, rating: newRating});
    //             await movie.save();
    //             response.status(200);
    //         } else {
    //             response.status(404).send();
    //         }
    //     } catch (error) {
    //         response.status(500).send();
    //     }
    // }

    // public async updateGrossing(response: any, movieId: string, newAmount: number) {
    //     var query = this.model.findOne({_id: movieId});
    //     try {
    //         let movies = await query.exec();
    //         if (movies) {
    //             movies.psuh({gross: newAmount});
    //             response.status(200);
    //         } else {
    //             response.status(404).send();
    //         }
    //     } catch (error) {
    //         response.status(500).send();
    //     }
    // }

    // Delete functions
    public async deleteMovie(response: any, movieId: string) {
        var query = this.model.findOne({_id: movieId});
        try {
            let movie = await query.exec();
            if (movie) {
                movie.deleteOne({_id: movieId});
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

