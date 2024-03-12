import * as Mongoose from "mongoose";
import { IMovieModel } from "../interfaces/IMovieModel";
import { v4 as uuidv4 } from 'uuid'

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
                tmdb_id: { type: Number, required: true },
                budget: Number,
                genres: [
                    {
                        id: Number,
                        name: String
                    }
                ],
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
                },
                ratings: [
                    {
                        source:  String,
                        value:  Number,
                        score:  Number,
                        votes:  Number,
                        popular:  Number
                    }
                ],
                streams: [
                    {
                        id:  Number,
                        name:  String,
                    }
                ],
                watch_providers: [
                    {
                        id:  Number,
                        name:  String,
                    }
                ],
                trailer: String,
                type: String,
                poster: String,
                backdrop: String,
                streamingInfo: [
                    {
                        service: String,
                        streamingType: String,
                        quality: String,
                        link: String,
                        videoLink: String,
                        leaving: Number,
                        availableSince: Number,
                    }
                ]
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
            this.model = Mongoose.model<IMovieModel>("movies", this.schema); 
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

    public async retrieveAllMoviesMin(response: any) {
        var query = this.model.find({}).select('tmdb_id title poster type');

        try {
            const items = await query.exec();
            
            response.json(items);
        }
        catch (e) {
            console.error(e);
        
        }
    }

    public async retrieveContent() {
        var query = this.model.find({}).select('tmdb_id title poster type');

        try {
            const items = await query.exec();
            return items;
        }
        catch (e) {
            console.error(e);
        }
    }

    public async retrieveMovieById(response: any, movieId: string) {
        try {
            const movieIdNumber = Number(movieId);
            const item = await this.model.findOne({ tmdb_id: movieIdNumber }).exec();
            if (!item) {
                return response.status(404).send(`No movie found with the given id: ${movieId}`);
            }
            response.json(item);
        } catch (e) {
            console.error(e);
        }
    }

    public async fetchMovieById( id: string) {
        
        const movieIdNumber = Number(id);
        const item = await this.model.findOne({ tmdb_id: movieIdNumber }).exec();
        return item;
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

