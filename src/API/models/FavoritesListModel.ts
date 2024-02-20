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
                _id: Mongoose.Schema.Types.ObjectId,
                favoritesListId: {
                    type: String,
                    unique: true,
                },
                userId: { 
                    type: String,
                    unique: true,
                },
                movies: [{type: String, ref: 'movies'},],
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
        const favoritesListId = uuidv4();
        var query = this.model.create({ userId: userId, favoritesListId : favoritesListId});
        try {
            const favoritesList = await query.exec();
            response.status(200).json(favoritesList);
        } catch (e) {
            console.log(e);
            response.status(500).send();
        }
    }

    public async addMovieToFavorites(response: any, userId: string, movieId: string) {
        try {
            const record = await this.model.findOne({ userId: userId });
            
            // Check if the movie is already in the favorites list
            if (record && record.movies.includes(movieId)) {
                response.status(400).json({ message: "Movie already exists in favorites." });
                return;
            }
            
            // If the user doesn't have a favorites list, create one
            if (!record) {
                const newRecord = new this.model({ userId: userId, movies: [movieId] });
                await newRecord.save();
                response.status(201).json(newRecord);
                return;
            }
            
            // Add the movie to the user's favorites list
            record.movies.push(movieId);
            await record.save();

            response.json(record);
        } catch (e) {
            console.error(e);
            response.status(500).send();
        }
    }

    public async removeMovieFromFavorites(response: any, userId: string, movieId: string) {
        var query = this.model.findOneAndUpdate(
            { userId: userId },
            { $pull: { movies: movieId } },
            { new: true },
        );

        try {
            const updatedFavorites = await query.exec();
            response.status(200).json(updatedFavorites);
        } catch (e) {
            console.error(e);
            response.status(500).send();
        }
    }

    public async retrieveFavorites(response: any, userId: string) {
        var query = this.model.findOne({ userId: userId }).populate('movies');

        try {
            const items = await query.exec();
            if (items) {
                response.status(200).json(items);
            } else {
                response.status(404).send();
            }
        }
        catch (e) {
            console.error(e);
            response.status(500).send();
        }
    }
}
export {FavoritesModel};

