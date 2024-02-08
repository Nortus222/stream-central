import * as Mongoose from "mongoose";
import { IRecommendationSetModel } from "../interfaces/IRecommendationSetModel";

class ReccomendationSetModel {
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
                recommendationSetId: String,
                userId: String,
                recommendedMovies: [{
                    movieId: String,
                    movieTitle: String,    
                }],
            },
            { collection: "recommendationSets" }
        );
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            } as Mongoose.ConnectOptions);
            this.model = Mongoose.model<IRecommendationSetModel>("recommendationSets", this.schema);    
        }
        catch (e) {
            console.error(e);        
        }
    }
}
export {ReccomendationSetModel};

