import * as Mongoose from "mongoose";
import { ITVShowModel } from "../interfaces/ITVShowModel";

class TVShowModel {
  public schema: any;
  public model: any;
  public dbConnectionString: string;

  public constructor(DB_CONNECTION_STRING: string) {
      this.dbConnectionString = DB_CONNECTION_STRING;
      this.createSchema();
      this.createModel();
  }

  private createSchema(): void {
    this.schema = new Mongoose.Schema({
      tmdb_id: { type: Number, required: true },
      backdrop: String,
      first_air_date: String,
      genres: [{
        id: Number,
        name: String
      }],
      homepage: String,
      keywords: [{
        id: Number,
        name: String
      }],
      last_air_date: String,
      number_of_episodes: Number,
      number_of_seasons: Number,
      origin_country: [String],
      original_name: String,
      name: String,
      overview: String,
      popularity: Number,
      poster: String,
      ratings: [{
        source: Number,
        value: Number,
        score: Number,
        votes: Number,
        popular: Number
      }],
      status: String,
      streamingInfo: [{
        service: String,
        streamingType: String,
        link: String,
        availableSince: Number
      }],
      streams: [{
        id: Number,
        name: String
      }],
      trailer: String,
      type: String,
      watch_providers: [{
        id: Number,
        name: String
      }]
    });
  }

  public async createModel() {
    try {
        await Mongoose.connect(this.dbConnectionString, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        } as Mongoose.ConnectOptions);
        this.model = Mongoose.model<ITVShowModel>("tvshows", this.schema); 
    }
    catch (e) {
        console.error(e);        
    }
  }

  public async retrieveAllTVShows(response: any) {
    var query = this.model.find({});

    try {
        const items = await query.exec();
        
        response.json(items);
    }
    catch (e) {
        console.error(e);
    
    }
  }

  public async retrieveAllTVShowsMin(response: any) {
    var query = this.model.find({}).select('tmdb_id name poster');

    try {
        const items = await query.exec();
        
        response.json(items);
    }
    catch (e) {
        console.error(e);
    
    }
  }

  public async retrieveContent() {
    var query = this.model.find({}).select('tmdb_id name poster');

    try {
        const items = await query.exec();
        return items;
    }
    catch (e) {
        console.error(e);
    }
  }

  public async retrieveTVShowById(response: any, tvShowId: string) {
    try {
      const tvShowIdNumber = Number(tvShowId);
      const item = await this.model.findOne({ tmdb_id: tvShowIdNumber }).exec();
      if (!item) {
          return response.status(404).send(`No tv show found with the given id: ${tvShowId}`);
      }
      response.json(item);
    } catch (e) {
        console.error(e);
    }
  }

}
export { TVShowModel };