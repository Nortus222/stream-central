import * as Mongoose from "mongoose";
import { IMovieModelMin } from "../interfaces/IMovieModelMin";

class MovieModelMin {
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
                tmdb_id: { type: Number, required: true },
                title: String,
                poster: String,
            },
            { collection: "movies" }
        );
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            } as Mongoose.ConnectOptions);
            this.model = Mongoose.model<IMovieModelMin>("moviesmin", this.schema); 
        }
        catch (e) {
            console.error(e);        
        }
    }

    public async retrieveAllMovies(response: any) {
        var query = this.model.find({});

        try {
            const items = await query.exec();
            
            response.json(items);
        }
        catch (e) {
            console.error(e);
        
        }
    }

    public async retrieveContent() {
        var query = this.model.find({});

        try {
            const items = await query.exec();
            return items;
        }
        catch (e) {
            console.error(e);
        
        }
    }


}
export {MovieModelMin};

