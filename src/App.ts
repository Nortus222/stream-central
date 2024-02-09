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
  public Users: UsertModel;
  public Favorites: FavoritesModel;
  public MovieGenres: MovieGenreModel;
  // public Recommendations: ReccomendationSetModel;


  //Run configuration methods on the Express instance.
  constructor(mongoDBConnection:string)
  {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Movies = new MovieModel(mongoDBConnection);
    this.Users = new UsertModel(mongoDBConnection);
    this.Favorites = new FavoritesModel(mongoDBConnection);
    this.MovieGenres = new MovieGenreModel(mongoDBConnection);
    // this.Recommendations = new ReccomendationSetModel(mongoDBConnection);
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
      var id = req.params.movieId;
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

    router.get('/users/:userId', async (req, res) => {
      var id = req.params.userId;
      console.log('Query single user with id: ' + id);
      await this.Users.retrieveUser(res, id);
    });

    router.get('/users', async (req, res) => {
      console.log('Query All users');
      await this.Users.retrieveAllUsers(res);
    });

    router.post('/users', async (req, res) => {
      var password = req.body.password;
      var loginStatus = req.body.loginStatus;
      var email = req.body.email;
      console.log('Create user');
      await this.Users.createUser(res, password, loginStatus, email);
    });

    router.get('/favorites/:userId', async (req, res) => {
      var id = req.params.userId;
      console.log('Query single favorites list for user with id: ' + id);
      await this.Favorites.retrieveFavorites(res, id);
    });

    router.post('/favorites', async (req, res) => {
      console.log(req.headers);
      var userId = req.headers.userid.toString();
      var movieId = req.headers.movieid.toString();
      console.log('Add movie with id: ' + movieId + ' to favorites list of user with id: ' + userId);
      await this.Favorites.addMovieToFavorites(res, userId, movieId);
    });

    router.delete('/favorites', async (req, res) => {
      var userId = req.headers.userid.toString();
      var movieId = req.headers.movieid.toString();
      console.log('Remove movie with id: ' + movieId + ' from favorites list of user with id: ' + userId);
      await this.Favorites.removeMovieFromFavorites(res, userId, movieId);
    });



    this.expressApp.use('/', router);
  }
}
export { App }