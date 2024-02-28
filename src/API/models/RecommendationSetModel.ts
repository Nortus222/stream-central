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
                id: String,
                userId: String,
                recommendedMovies: [String],
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

    public async getAllMoviesInRecommendationSet(response: any, recommendationSetId: string) {
        var query = this.model.findOne({recommendationSetId: recommendationSetId});
        try {
            const recSet = await query.exec();
            if (recSet) {
                response.status(200).json(recSet.movies);
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async getNumberMoviesInRecommendationSet(response: any, recommendationSetId: string) {
        var query = this.model.findOne({recommendationSetId: recommendationSetId});
        try {
            const recSet = await query.exec();
            if (recSet) {
                response.status(200).json({numberOfMovies: recSet.movies.length});
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async addMovieToRecommendationSet(response: any, recommendationSetId: string, movieId: string, movieTitle: string) {
        var query = this.model.findOne({recommendationSetId: recommendationSetId});
        try {
            let recSet = await query.exec();
            if (recSet) {
                recSet.movies.push({movieId: movieId, movieTitle: movieTitle});
                await recSet.save();
                response.status(200).send();
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async removeMovieFromRecommendationSet(response: any, recommendationSetId: string, movieId: string) {
        var query = this.model.findOne({recommendationSetId: recommendationSetId});
        try {
            let recSet = await query.exec();
            if (recSet) {
                recSet.movies = recSet.movies.filter((movie: {movieId: String, movieTitle: String}) => movie.movieId !== movieId);
                await recSet.save();
                response.status(200).send();
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }

    public async deleteRecommendationSet(response: any, recommendationSetId: string) {
        var query = this.model.findOne({recommendationSetId: recommendationSetId});
        try {
            const recSet = await query.exec();
            if (recSet) {
                await this.model.deleteOne({recommendationSetId: recommendationSetId});
                response.status(200).send();
            } else {
                response.status(404).send();
            }
        } catch (error) {
            response.status(500).send();
        }
    }
}
export {ReccomendationSetModel};

