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
        this.schema = new Mongoose.Schema(
            {
                userId: String,
                movies: [ 
                    {
                        movieId: String,
                        movieTitle: String,
                    }
                ],
            }, {collection: 'favoritesList'}
        );
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

    // Read Function
    public async getUserFavorites(response: any, userId: string) {
        var query = this.model.findOne({userId: userId});
        try {
            const favoritesList = await query.exec();
            if (favoritesList) {
                response.status(200);
            } else {
                response.status(404);
            }
        } catch (error) {
            response.status(500);
        }
    }

    // Update functions
    public async addToFavorites(response: any, userId: string, movieId: string, movieTitle: string) : Promise<void> {
        var query = this.model.findOne({userId: userId});
        try {
            const favoritesList = await query.exec();
            if (favoritesList) {
                favoritesList.movies.push({movieId: movieId, movieTitle: movieTitle});
                await favoritesList.save();
                response.status(200);
            } else {
                response.status(404);
            }
        } catch (error) {
            response.status(500);
        }
    }

    public async removeFromFavorites(response: any, userId: string, movieId: string, movieTitle: string) {
        var query = this.model.findOne({userId: userId});
        try {
            const favoritesList = await query.exec();
            if (favoritesList) {
                favoritesList.movies = favoritesList.movies.filter(
                    (movie: {movieId: string}) => movie.movieId !== movieId
                );
                await favoritesList.save();
                response.status(200);
            } else {
                response.status(404);
            }
        } catch (error) {
            response.status(500);
        }
    }

    // Delete Functions
    public async deleteFavoritesList(response: any, userId: string) {
        var query = this.model.findOne({userId: userId});
        try {
            const favoritesList = await query.exec();
            if (favoritesList) {
                this.model.Delete(favoritesList);
                response.status(200);
            } else {
                response.status(404);
            }
        } catch (error) {
            response.status(500);
        }
    }

    // Other functions
    public async getFavoritesListLength(response: any, userId: string) {
        var query = this.model.findOne({userId: userId});
        try {
            const favoritesList = await query.exec();
            if (favoritesList) {
                response.status(200);
                response.json({length: favoritesList.length()});
            } else {
                response.status(404);
            }
        } catch (error) {
            response.status(500);
        }
    }
}
export {FavoritesModel};

