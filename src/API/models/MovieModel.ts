import * as Mongoose from "mongoose";
import { IMovieModel } from "../interfaces/IMovieModel";

class MovieModel {
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
                budget: Number,
                genres: [
                    {
                        id: Number,
                        name: String
                    }
                ],
                tmdb_id: Number,
                imdb_id: String,
                original_language: String,
                original_title: String,
                overview: String,
                popularity: Number,
                poster_path: String,
                production_countries: [
                    {
                        iso_3166_1: String,
                        name: String
                    }
                ],
                release_date: String,
                revenue: Number,
                runtime: Number,
                spoken_languages: [
                    {
                        english_name: String,
                        iso_639_1: String,
                        name: String
                    }
                ],
                status: String,
                tagline: String,
                title: String,
                vote_average: Number,
                vote_count: Number,
                casts: {
                    cast: [
                        {
                            gender: Number,
                            id: Number,
                            name: String,
                            profile_path: String,
                            character: String,
                            order: Number
                        }
                    ],
                },
                keywords: {
                    keywords: [
                        {
                            id: Number,
                            name: String
                        }
                    ]
                }
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
            this.model = Mongoose.model<IMovieModel>("Movies", this.schema);  
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

    public async retrieveMovieById(response: any, tmdb_id: number) {
        var query = this.model.find({ tmdb_id: tmdb_id });

        try {
            const item = await query.exec();
            response.json(item);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async retrieveMovieCount(response: any) {
        var query = this.model.estimatedDocumentCount();

        try {
            const numberOfItems = await query.exec();
            response.json(numberOfItems);
        }
        catch (e) {
            console.error(e);
        }
    }

}
export {MovieModel};

