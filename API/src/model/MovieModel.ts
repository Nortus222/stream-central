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
                movieId: String,
                movieTitle: String,
                genreIds: [{
                    genreId: String,
                    genreName: String,
                }],
                moviegenre: [{
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
            }, {collection: 'movies'}
        );
    }

    // CRUD functions
    // Create function
    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            } as Mongoose.ConnectOptions);
            this.model = Mongoose.model<IMovieModel>("Task", this.schema);    
        }
        catch (e) {
            console.error(e);        
        }
    }

    // Read functions
    public async getMovie(response: any, movieId: string) {
        var query = this.model.findOne({movieId: movieId});
        try {
            const movie = await query.exec();
            if (movie) {
                response.status(200);
                response.json(movie);
            } else {
                response.status(404);
            }
        } catch (error) {
            response.status(500);
        }
    }

    public async getMovieRatings(response: any, movieId: string) {
        var query = this.model.findOne({movieId: movieId});
        try {
            const movie = await query.exec();
            if (movie) {
                response.status(200);
                response.json(movie.movieRatings);
            } else {
                response.status(404);
            }
        } catch (error) {
            response.status(500);
        }
    }

    public async getMovieImage(response: any, movieId: string) {
        var query = this.model.findOne({movieId: movieId});
        try {
            const movie = await query.exec();
            if (movie) {
                response.status(200);
                response.json({imageFileName: movie.imageFileName});
            } else {
                response.status(404);
            }
        } catch (error) {
            response.status(500);
        }
    }
}
export {MovieModel};

