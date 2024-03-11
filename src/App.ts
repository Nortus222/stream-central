import * as path from 'path';
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

import * as session from 'express-session'
import * as cookieParser from 'cookie-parser';

import GooglePassportObj from './GooglePassport';
import * as passport from 'passport'

declare global {
  namespace Express {
    interface User {
      id: string,
      displayName: string,
    }
  }
}

// const cors = require('cors');

class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Movies: MovieModel;
  public Users: UserModel;
  public Favorites: FavoritesModel;
  public MovieGenres: MovieGenreModel;
  public TVShows: TVShowModel;
  public googlePassportObj: GooglePassportObj;
  // public TVShowsMin: TVShowModelMin;
  // public MoviesMin: MovieModelMin;
  // public Recommendations: ReccomendationSetModel;


  //Run configuration methods on the Express instance.
  constructor(mongoDBConnection:string)
  {
    this.googlePassportObj = new GooglePassportObj();
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Movies = new MovieModel(mongoDBConnection);
    this.Users = new UserModel(mongoDBConnection);
    this.Favorites = new FavoritesModel(mongoDBConnection);
    this.MovieGenres = new MovieGenreModel(mongoDBConnection);
    this.TVShows = new TVShowModel(mongoDBConnection);
    // this.TVShowsMin = new TVShowModelMin(mongoDBConnection);
    // this.MoviesMin = new MovieModelMin(mongoDBConnection);
    // this.Recommendations = new ReccomendationSetModel(mongoDBConnection);
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use(session({ secret: 'keyboard cat' }));
    this.expressApp.use(cookieParser());
    this.expressApp.use(passport.initialize());
    this.expressApp.use(passport.session());
    this.expressApp.use( (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "*");
      next();
    });
  }

  private validateAuth(req, res, next):void {
    if (req.isAuthenticated()) { console.log("user is authenticated"); return next(); }
    console.log("user is not authenticated");
    res.redirect('/');
  }



  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    router.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));

    router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
      console.log("successfully authenticated user and returned to callback page.");
      res.redirect('/#/movies');
    });

    router.get('/app/user/info', this.validateAuth, (req, res) => {
      console.log('Query All list');
      console.log("user info:" + JSON.stringify(req.user));
      console.log("user info:" + JSON.stringify(req.user.id));
      console.log("user info:" + JSON.stringify(req.user.displayName));
      res.json({"username" : req.user.displayName, "id" : req.user.id});
    });

    router.get('/movies/:movieId', async (req, res) => {
      var id = req.params.movieId;
      console.log('Query single movie with id: ' + id);
      await this.Movies.retrieveMovieById(res, id);
    });

    router.get('/movies/', async (req, res) => {
      console.log('Query All movies');
      await this.Movies.retrieveAllMoviesMin(res);
    });

    router.get('/moviesCount', async (req, res) => {
      console.log('Query the number of movie elements in db');
      await this.Movies.retrieveMovieCount(res);
    });

    router.get('/tvshows', async (req, res) => {
      console.log('Query All tvshows');
      await this.TVShows.retrieveAllTVShows(res);
    });

    router.get('/tvshows/:tvshowId', async (req, res) => {
      var id = req.params.tvshowId;
      console.log('Query single tvshow with id: ' + id);
      await this.TVShows.retrieveTVShowById(res, id);
    });
/*
    router.post('/users', async (req, res) => {
      var jsonObj = req.body;
      console.log('Create user');
      await this.Users.createUser(res, jsonObj);
    });
*/
    router.get('/user/favorites', async (req, res) => {
      var id = req.user.id;
      console.log('Query single favorites list for user with id: ' + id);
      await this.Favorites.retrieveFavorites(res, id);
    });

    router.post('/user/favorites/:movieId', async (req, res) => {
      var userId = req.user.id;
      var movieId = req.params.movieId.toString();
      console.log('Add movie with id: ' + movieId + ' to favorites list of user with id: ' + userId);
      await this.Favorites.addMovieToFavorites(res, userId, movieId);
    });

    router.delete('/user/favorites/:movieId', async (req, res) => {
      var userId = req.user.id;
      var movieId = req.params.movieId.toString();
      console.log('Remove movie with id: ' + movieId + ' from favorites list of user with id: ' + userId);
      await this.Favorites.removeMovieFromFavorites(res, userId, movieId);
    });
    
    router.get('/allContent', async (req, res) => {
      console.log('Query all content');
      var movies = await this.Movies.retrieveContent();
      var shows = await this.TVShows.retrieveContent();

      var allContent = [...movies, ...shows]
      allContent.sort((a, b) => (a['tmdb_id'] > b['tmdb_id']) ? 1 : -1);
     
      res.json(allContent);
    });


    this.expressApp.use('/', router);

    this.expressApp.use('/', express.static(__dirname+'/../angular/browser'));
  }
}
export { App }