import * as Mongoose from "mongoose";
import { IMovieGenreModel } from "../interfaces/IMovieGenreModel";
import { v4 as uuidv4 } from 'uuid'

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
                tmdb_id: {type: Number, required: true},
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

    public async createGenre(response: any, genreInfo: any) {
        var query = this.model.create(genreInfo);
        try {
            const genre = query.exec();
            response.status(200).json(genre);
        } catch (e) {
            console.error(e);
        }
    }


    public async getAllMoviesInGenre(response: any, genreId: string) {
        const genreIdNumber = Number(genreId);
        var query = this.model.findOne({ tmdb_id: genreIdNumber});
        try {
            const genre = await query.exec();
            if (genre) {
                response.json(genre.movies);
            } else {
                response.status(404).send();
            }
        } catch (error) {
            console.error(error);
        }
    }

    public async getNumberMoviesInGenre(response: any, genreId: string) {
        const genreIdNumber = Number(genreId);
        var query = this.model.findOne({ tmdb_id: genreIdNumber});
        try {
            const genre = await query.exec();
            if (genre) {
                response.json({numberOfMovies: genre.movies.length});
            } else {
                response.status(404).send();
            }
        } catch (error) {
            console.error(error);
        }
    }

    public async addMovieToGenre(response: any, genreId: string, movieId: string) {
        const genreIdNumber = Number(genreId);
        const movieIdNumber = Number(movieId);
        var query = this.model.findOne({ tmdb_id : genreIdNumber});
        try {
            let genre = await query.exec();
            if (genre) {
                genre.movies.push(movieIdNumber);
                await genre.save();
                response.json(genre);
            } else {
                response.status(404).send();
            }
        } catch (error) {
            console.log(error);
        }
    }

    public async removeMovieFromGenre(response: any, genreId: string, movieId: string) {
        const genreIdNumber = Number(genreId);
        const movieIdNumber = Number(movieId);

        var query = this.model.findOne({ tmdb_id: genreIdNumber});
        try {
            let genre = await query.exec();
            if (genre) {
                genre.movies = genre.movies.filter((movie_id: Number) => movie_id !== movieIdNumber);
                await genre.save();
                response.json(genre);
            } else {
                response.status(404).send();
            }
        } catch (error) {
            console.error(error);
        }
    }

    public async deleteGenre(response: any, genreId: string) {
        const genreIdNumber = Number(genreId);
        var query = this.model.findOne({tmdb_id: genreIdNumber});
        try {
            const genre = await query.exec();
            if (genre) {
                await this.model.deleteOne({tmdb_id: genreIdNumber});
                response.send({tmdb_id: genreIdNumber});
            } else {
                response.status(404).send();
            }
        } catch (error) {
            console.error(error);
        }
    }
}
export {MovieGenreModel};

