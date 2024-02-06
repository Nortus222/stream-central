import * as Mongoose from "mongoose";
import { IFavoritesModel } from "../interfaces/IFavoritesListModel";

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
        this.schema = new Mongoose.Schema({
            userId: String,
            movies: [{
                movieId: String,
                movieTitle: String,
            }],
        }, {collection: 'favoritesList'});
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            } as Mongoose.ConnectOptions);
            this.model = Mongoose.model<IFavoritesModel>("Favorites", this.schema);    
        }
        catch (e) {
            console.error(e);        
        }
    }

    public async getUserFavorites(response: any, userId: string) {
        var query = this.model.findOne({userId: userId});
        try {
            const favoritesList = await query.exec();
            if (favoritesList) {
                response.status(200).json(favoritesList.movies);
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async addToFavorites(response: any, userId: string, movieId: string, movieTitle: string) {
        var query = this.model.findOne({userId: userId});
        try {
            const favoritesList = await query.exec();
            if (favoritesList) {
                favoritesList.movies.push({movieId: movieId, movieTitle: movieTitle});
                await favoritesList.save();
                response.status(200).send();
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async removeFromFavorites(response: any, userId: string, movieId: string) {
        var query = this.model.findOne({userId: userId});
        try {
            let favoritesList = await query.exec();
            if (favoritesList) {
                favoritesList.movies = favoritesList.movies.filter((movie: {movieId: String, movieTitle: String}) => movie.movieId !== movieId);
                await favoritesList.save();
                response.status(200).send();
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async deleteFavoritesList(response: any, userId: string) {
        try {
            const result = await this.model.deleteOne({userId: userId});
            if (result.deletedCount > 0) {
                response.status(200).send();
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async getFavoritesListLength(response: any, userId: string) {
        var query = this.model.findOne({userId: userId});
        try {
            const favoritesList = await query.exec();
            if (favoritesList) {
                response.status(200).json({length: favoritesList.movies.length});
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }
}
export {FavoritesModel};


