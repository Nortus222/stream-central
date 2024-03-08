import * as express from 'express';
import * as bodyParser from 'body-parser';
import { FavoritesModel } from './API/models/FavoritesListModel';
import { MovieGenreModel } from './API/models/MovieGenreModel';
import { MovieModel } from './API/models/MovieModel';
import { ReccomendationSetModel } from './API/models/RecommendationSetModel';
import { UserModel } from './API/models/UserModel';
import { TVShowModel } from './API/models/TVShowModel';
import { TVShowModelMin } from './API/models/TVShowModelMin';
import { MovieModelMin } from './API/models/MovieModelMin';

class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Movies: MovieModel;
  public Users: UserModel;
  public Favorites: FavoritesModel;
  public MovieGenres: MovieGenreModel;
  public TVShows: TVShowModel;
  public TVShowsMin: TVShowModelMin;
  public MoviesMin: MovieModelMin;
  // public Recommendations: ReccomendationSetModel;


  //Run configuration methods on the Express instance.
  constructor(mongoDBConnection:string)
  {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Movies = new MovieModel(mongoDBConnection);
    this.Users = new UserModel(mongoDBConnection);
    this.Favorites = new FavoritesModel(mongoDBConnection);
    this.MovieGenres = new MovieGenreModel(mongoDBConnection);
    this.TVShows = new TVShowModel(mongoDBConnection);
    this.TVShowsMin = new TVShowModelMin(mongoDBConnection);
    this.MoviesMin = new MovieModelMin(mongoDBConnection);
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
      await this.MoviesMin.retrieveAllMovies(res);
    });

    router.get('/moviesCount', async (req, res) => {
      console.log('Query the number of movie elements in db');
      await this.Movies.retrieveMovieCount(res);
    });

    router.get('/tvshows', async (req, res) => {
      console.log('Query All tvshows');
      await this.TVShowsMin.retrieveAllTVShows(res);
    });

    router.get('/tvshows/:tvshowId', async (req, res) => {
      var id = req.params.tvshowId;
      console.log('Query single tvshow with id: ' + id);
      await this.TVShows.retrieveTVShowById(res, id);
    });

    router.post('/users', async (req, res) => {
      var jsonObj = req.body;
      console.log('Create user');
      await this.Users.createUser(res, jsonObj);
    });

    router.get('/favorites/:userId', async (req, res) => {
      var id = req.params.userId;
      console.log('Query single favorites list for user with id: ' + id);
      await this.Favorites.retrieveFavorites(res, id);
    });

    router.post('/favorites/:userId/:movieId', async (req, res) => {
      var userId = req.params.userId.toString();
      var movieId = req.params.movieId.toString();
      console.log('Add movie with id: ' + movieId + ' to favorites list of user with id: ' + userId);
      await this.Favorites.addMovieToFavorites(res, userId, movieId);
    });

    router.delete('/favorites/:userId/:movieId', async (req, res) => {
      var userId = req.params.userId.toString();
      var movieId = req.params.movieId.toString();
      console.log('Remove movie with id: ' + movieId + ' from favorites list of user with id: ' + userId);
      await this.Favorites.removeMovieFromFavorites(res, userId, movieId);
    });
    
    router.get('/allContent', async (req, res) => {
      console.log('Query all content');
      var movies = await this.MoviesMin.retrieveContent();
      var shows = await this.TVShowsMin.retrieveContent();

      var allContent = []
      allContent.push(movies);
      allContent.push(shows);
      allContent.sort((a, b) => (a.tmdb_id > b.tmdb_id) ? 1 : -1);
     
      res.json(allContent);
    });


    this.expressApp.use('/', router);

    this.expressApp.use('/', express.static(__dirname+'/../angular/browser'));
  }
}
export { App }