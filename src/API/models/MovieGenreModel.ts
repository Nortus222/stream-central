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
                _id: Mongoose.Schema.Types.ObjectId,
                tmdb_id: Number,
                genreName: String,
                movies: [Number] ,
            }, {collection: 'movieGenres'}
        );
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            } as Mongoose.ConnectOptions);
            this.model = Mongoose.model<IMovieGenreModel>("movieGenres", this.schema);    
        }
        catch (e) {
            console.error(e);        
        }
    }

    public async getAllMoviesInGenre(response: any, genreId: string) {
        var query = this.model.findOne({_id: genreId});
        try {
            const genre = await query.exec();
            if (genre) {
                response.status(200).json(genre.movies);
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async getNumberMoviesInGenre(response: any, genreId: string) {
        var query = this.model.findOne({_id: genreId});
        try {
            const genre = await query.exec();
            if (genre) {
                response.status(200).json({numberOfMovies: genre.movies.length});
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async addMovieToGenre(response: any, genreId: string, movieId: string) {
        var query = this.model.findOne({_id: genreId});
        try {
            let genre = await query.exec();
            if (genre) {
                genre.movies.push(movieId);
                await genre.save();
                response.status(200).json(genre);
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async removeMovieFromGenre(response: any, genreId: string, movieId: string) {
        var query = this.model.findOne({_id: genreId});
        try {
            let genre = await query.exec();
            if (genre) {
                genre.movies = genre.movies.filter((movie_id: Number) => movie_id !== Number(movieId));
                await genre.save();
                response.status(200).json(genre);
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async deleteGenre(response: any, genreId: string) {
        var query = this.model.findOne({_id: genreId});
        try {
            const genre = await query.exec();
            if (genre) {
                await this.model.deleteOne({_id: genreId});
                response.status(200).send();
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }
}
export {MovieGenreModel};

