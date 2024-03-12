import * as Mongoose from "mongoose";
import { IFavoritesModel } from "../interfaces/IFavoritesListModel";
import { v4 as uuidv4 } from 'uuid'

class FavoritesModel {
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
                userId: { type: String, required: true },
                movies: [Number],
            }, {collection: 'favorites'}
        );
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            } as Mongoose.ConnectOptions);
            this.model = Mongoose.model<IFavoritesModel>("favorites", this.schema);    
        }
        catch (e) {
            console.error(e);     
        }
    }

    public async createFavoritesList(response: any, userId: string) {
        var query = this.model.create({ userId: userId, movies: [] });
        try {
            const favoritesList = await query.exec();
            response.json(favoritesList);
        } catch (e) {
            console.error(e);
        }
    }

    public async addMovieToFavorites(response: any, userId: string, tmdbId: string) {
        try {
            const record = await this.model.findOne({userId: userId });
            const movieId = Number(tmdbId);
            
            // Check if the movie is already in the favorites list
            if (record && record.movies.includes(movieId)) {
                response.status(400).json({ message: "Movie already exists in favorites." });
                return;
            }
            
            // If the user doesn't have a favorites list, create one
            if (!record) {
                const newRecord = new this.model({userId: userId, movies: [movieId] });
                await newRecord.save();
                response.json(newRecord);
                return;
            }
            
            // Add the movie to the user's favorites list
            record.movies.push(movieId);
            await record.save();

            response.json(record);
        } catch (e) {
            console.error(e);
        }
    }

    public async removeMovieFromFavorites(response: any, userId: string, tmdbId: string) {
        const movieId = Number(tmdbId);
        var query = this.model.findOneAndUpdate(
            { userId: userId },
            { $pull: { movies: movieId } },
            { new: true },
        );

        try {
            const updatedFavorites = await query.exec();
            console.log(updatedFavorites);
            response.json(updatedFavorites);
        } catch (e) {
            
            console.error(e);
        }
    }

    public async retrieveFavorites( userId: string) {
        var query = this.model.findOne({ userId: userId });

        try {
            const item = await query.exec();

            return item;
           
        }
        catch (e) {
            console.error(e);
        }
    }
}
export {FavoritesModel};

