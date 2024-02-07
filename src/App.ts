import * as express from 'express';
import * as bodyParser from 'body-parser';
import { FavoritesModel } from './API/models/FavoritesListModel';
import { MovieGenreModel } from './API/models/MovieGenreModel';
import { MovieModel } from './API/models/MovieModel';
import { ReccomendationSetModel } from './API/models/RecommendationSetModel';
import { UsertModel } from './API/models/UserModel';

class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Movies: MovieModel;

  //Run configuration methods on the Express instance.
  constructor(mongoDBConnection:string)
  {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Movies = new MovieModel(mongoDBConnection);
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use( (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    router.get('/movies/:movieId', async (req, res) => {
      var id = Number(req.params.movieId);
      console.log('Query single movie with id: ' + id);
      await this.Movies.retrieveMovieById(res, id);
    });

    router.get('/movies/', async (req, res) => {
      console.log('Query All movies');
      await this.Movies.retrieveAllMovies(res);
    });

    router.get('/moviesCount', async (req, res) => {
      console.log('Query the number of movie elements in db');
      await this.Movies.retrieveMovieCount(res);
    });

    this.expressApp.use('/', router);
  }
}
export { App }