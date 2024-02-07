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
                movies: [Number],
            }, {collection: 'favoritesList'}
        );
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            } as Mongoose.ConnectOptions);
            this.model = Mongoose.model<IFavoritesModel>("Task", this.schema);    
        }
        catch (e) {
            console.error(e);        
        }
    }
}
export {FavoritesModel};

