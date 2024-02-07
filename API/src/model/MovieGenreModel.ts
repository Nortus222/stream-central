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
        this.schema = new Mongoose.Schema({
            genreId: {
                type: String,
                unique: false,
            },
            genreName: {
                type: String,
                unique: false,
            },
            movies: [{
                movieId: {
                    type: String,
                    unique: false,
                },
            }],
        }, {collection: 'movieGenres'});
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            } as Mongoose.ConnectOptions);
            this.model = Mongoose.model<IMovieGenreModel>("MovieGenre", this.schema);  
        }
        catch (e) {
            console.error(e);
        }
    }

    public async getAllMoviesInGenre(response: any, genreId: string) {
        var query = this.model.findOne({genreId: genreId});
        try {
            const genre = await query.exec();
            if (genre) {
                response.status(200).json(genre.movies);
            } else {
                response.status(304).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async getNumberMoviesInGenre(response: any, genreId: string) {
        var query = this.model.findOne({genreId: genreId});
        try {
            const genre = await query.exec();
            if (genre) {
                response.status(200).json({numberOfMovies: genre.movies.length});
            } else {
                response.status(304).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async addMovieToGenre(response: any, genreId: string, movieId: string, movieTitle: string) {
        var query = this.model.findOne({genreId: genreId});
        try {
            let genre = await query.exec();
            if (genre) {
                genre.movies.push({movieId: movieId, movieTitle: movieTitle});
                await genre.save();
                response.status(200).json();
            } else {
                response.status(304).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async removeMovieFromGenre(response: any, genreId: string, movieId: string) {
        var query = this.model.findOne({genreId: genreId});
        try {
            let genre = await query.exec();
            if (genre) {
                genre.movies = genre.movies.filter((movie: {movieId: String, movieTitle: String}) => movie.movieId !== movieId);
                await genre.save();
                response.status(200).json(genre);
            } else {
                response.status(304).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async deleteGenre(response: any, genreId: string) {
        var query = this.model.findOne({genreId: genreId});
        try {
            const genre = await query.exec();
            if (genre) {
                await this.model.deleteOne({genreId: genreId});
                response.status(200).send();
            } else {
                response.status(304).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }
}
export {MovieGenreModel};
