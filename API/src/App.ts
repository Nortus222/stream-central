import * as express from 'express';
import * as bodyParser from 'body-parser';
import { FavoritesModel } from './model/FavoritesListModel';
import { MovieGenreModel } from './model/MovieGenreModel';
import { MovieModel } from './model/MovieModel';
import { ReccomendationSetModel } from './model/RecommendationSetModel';
import { UsertModel } from './model/UserModel';
import * as crypto from 'crypto';
import

class App {

    public expressApp: express.Application;
    public FavoritesLists: FavoritesModel;
    public MovieGenres: MovieGenreModel;
    public Movies: MovieModel;
    public RecommendationSets: ReccomendationSetModel;
    public Users: UsertModel;

    constructor(mongoDBConnection: string) {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.FavoritesLists = new FavoritesModel(mongoDBConnection);
        this.MovieGenres = new MovieGenreModel(mongoDBConnection);
        this.Movies = new MovieModel(mongoDBConnection);
        this.RecommendationSets = new ReccomendationSetModel(mongoDBConnection);
        this.Users = new UsertModel(mongoDBConnection);
    }

    private middleware(): void {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use( (req, res, next) => {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          next();
        });
      }

    private routes(): void {
        let router = express.Router();
    }
}
export { App }