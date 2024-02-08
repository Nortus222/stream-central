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
                _id: Mongoose.Schema.Types.ObjectId,
                userId: Mongoose.Types.ObjectId,
                movies: [{type: Mongoose.Schema.Types.ObjectId, ref: 'movies'},],
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

    public async addMovieToFavorites(response: any, userId: string, movieId: string) {
        var query = this.model.findOneAndUpdate(
            { userId: userId },
            { $push: { movies: movieId } },
            { new: true },
        );

        try {
            const updatedFavorites = await query.exec();
            response.json(updatedFavorites);
        } catch (e) {
            console.error(e);
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
            response.json(updatedFavorites);
        } catch (e) {
            console.error(e);
        }
    }

    public async retrieveFavorites(response: any, userId: string) {
        var query = this.model.findOne({ userId: userId }).populate('movies');

        try {
            const items = await query.exec();
            response.json(items);
        }
        catch (e) {
            console.error(e);
        }
    }
}
export {FavoritesModel};

