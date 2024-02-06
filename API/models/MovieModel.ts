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
                adult: Boolean,
                belongs_to_collection: {
                    id: Number,
                    name: String,
                    poster_path: String,
                    backdrop_path: String
                },
                budget: Number,
                genres: [
                    {
                        id: Number,
                        name: String
                    }
                ],
                id: Number,
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
                            adult: Boolean,
                            gender: Number,
                            id: Number,
                            known_for_department: String,
                            name: String,
                            original_name: String,
                            popularity: Number,
                            profile_path: String,
                            cast_id: Number,
                            character: String,
                            credit_id: String,
                            order: Number
                        }
                    ],
                    crew: [
                        {
                            adult: Boolean,
                            gender: Number,
                            id: Number,
                            known_for_department: String,
                            name: String,
                            original_name: String,
                            popularity: Number,
                            profile_path: String,
                            credit_id: String,
                            department: String,
                            job: String
                        }
                    ]
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

    public async retrieveMovieById(response: any, id: number) {
        var query = this.model.find({ id: id });

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

