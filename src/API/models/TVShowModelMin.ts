import * as Mongoose from "mongoose";
import {ITVShowModelMin} from "../interfaces/ITVShowModelMin";

class TVShowModelMin {
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
      name: String,
      poster: String,
    });
  }

  public async createModel() {
    try {
        await Mongoose.connect(this.dbConnectionString, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        } as Mongoose.ConnectOptions);
        this.model = Mongoose.model<ITVShowModelMin>("tvshows", this.schema); 
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

}
export { TVShowModelMin };