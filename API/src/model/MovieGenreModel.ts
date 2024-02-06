import * as Mongoose from "mongoose";
import { IMovieGenreModel } from "../interfaces/IMovieGenreModel";

class MovieGenreModel {
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
                genreId: String,
                genreName: String,
                movies: [
                    {
                        movieId: String,
                        movieTitle: String,
                    }
                ],
            }, {collection: 'movieGenres'}
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
            this.model = Mongoose.model<IMovieGenreModel>("Task", this.schema);  
        }
        catch (e) {}
    }

    // Read functions
    public async getAllMoviesInGenre(response: any, genreId: string) {
        var query = this.model.findOne({genreId: genreId});
        try {
            const genre = await query.exec();
            if (genre) {
                response.status(200);
                response.json(genre.movies);
            } else {
                response.status(404);
            }
        } catch (error) {
            response.status(500);
        }
    }

    public async getNumberMoviesInGenre(response: any, genreId: string) {
        var query = this.model.findOne({genreId: genreId});
        try {
            const genre = await query.exec();
            if (genre) {
                response.status(200);
                response.json({movies: genre.movies.length()});
            } else {
                response.status(404);
            }
        } catch (error) {
            response.status(500);
        }
    }

    // Update function
    public async addMovieToGenre(response: any, genreId: string, movieId: string, movieTitle: string) {
        var query = this.model.findOne({genreId: genreId});
        try {
            const genre = await query.exec();
            if (genre) {
                genre.movie.push({movieId: movieId, movieTitle: movieTitle});
                await genre.save();
                response.status(200);
            } else {
                response.status(404);
            }
        } catch (error) {
            response.status(500);
        }
    }

    public async removeMovieFromGenre(response: any, genreId: string, movieId: string) {
        var query = this.model.findOne({genreId: genreId});
        try {
            const genre = await query.exec();
            if (genre) {
                genre.movies = genre.movies.filter(
                    (movie: {movieId: string, movieTitle: string})=> movie.movieId !== movieId
                )
                await genre.save();
                response.status(200);
            } else {
                response.status(404);
            }
        } catch (error) {
            response.status(500);
        }
    }

    // Delete functions
    public async deleteGenre(response: any, genreId: string) {
        var query = this.model.findOne({genreId: genreId});
        try {
            const genre = await query.exec();
            if (genre) {
                genre.Delete();
                response.status(200);
            } else {
                response.status(404);
            }
        } catch (error) {
            response.status(500);
        }
    }
}
export {MovieGenreModel};

