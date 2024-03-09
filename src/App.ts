import * as express from 'express';
import * as bodyParser from 'body-parser';
import { FavoritesModel } from './API/models/FavoritesListModel';
import { MovieGenreModel } from './API/models/MovieGenreModel';
import { MovieModel } from './API/models/MovieModel';
import { ReccomendationSetModel } from './API/models/RecommendationSetModel';
import { UserModel } from './API/models/UserModel';
import * as passport from 'passport'
import * as passportFacebook from 'passport-facebook'
import * as mongoose from 'mongoose'
import * as mongodb from 'mongodb'
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Movies: MovieModel;
  public Users: UserModel;
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
    this.Users = new UserModel(mongoDBConnection);
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

    this.expressApp.use(passport.initialize());

    passport.use(new passportFacebook.FacebookStrategy({
      clientID: 395834456512495,
      clientSecret: "73b168365d93c17f6d33c0661f45e37c",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },

    function verify(accessToken, refreshToken, profile, cb) {
      passportFacebook.User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  ));
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    // Passport Facebook SSO
    router.get('/auth/facebook',
      passport.authenticate('facebook'));

    router.get('/auth/facebook/callback',
      passport.authenticate('facebook', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

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



    this.expressApp.use('/', router);
  }
}
export { App }