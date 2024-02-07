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
                genreId: Number,
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
            this.model = Mongoose.model<IMovieGenreModel>("MovieGenres", this.schema);    
        }
        catch (e) {
            console.error(e);        
        }
    }
}
export {MovieGenreModel};

