import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session'
import * as cookieParser from 'cookie-parser';

import { FavoritesModel } from './API/models/FavoritesListModel';
import { MovieGenreModel } from './API/models/MovieGenreModel';
import { MovieModel } from './API/models/MovieModel';
import { UserModel } from './API/models/UserModel';
import { TVShowModel } from './API/models/TVShowModel';

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

class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Movies: MovieModel;
  public Users: UserModel;
  public Favorites: FavoritesModel;
  public MovieGenres: MovieGenreModel;
  public TVShows: TVShowModel;
  public googlePassportObj: GooglePassportObj;

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
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    res.redirect('https://streamcentral.azurewebsites.net/auth/google');
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    router.get('/auth/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']}));

    router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
      console.log("successfully authenticated user and returned to callback page.");
      console.log("redirecting to /#/movies");
      res.redirect('/#/movies');
    });

    router.get('/app/user/info', this.validateAuth, (req, res) => {
      console.log('Query All list');
      console.log("user info:" + JSON.stringify(req.user));
      console.log("user info:" + JSON.stringify(req.user.id));
      console.log("user info:" + JSON.stringify(req.user.displayName));
      res.json({"username" : req.user.displayName, "id" : req.user.id});
    });

    router.get('/user/loggedIn', (req, res) => {
      console.log('Check if logged in');
      if (req.user) {
        res.json({loggedIn: true});
      } else {
        res.json({loggedIn: false});
      }
    });

    router.get('/user/logout', (req, res) => {
      req.logout(function(err) {
       
        res.redirect('/');
      });

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

    router.get('/tvshows', async (req, res) => {
      console.log('Query All tvshows');
      await this.TVShows.retrieveAllTVShows(res);
    });

    router.get('/tvshows/:tvshowId', async (req, res) => {
      var id = req.params.tvshowId;
      console.log('Query single tvshow with id: ' + id);
      await this.TVShows.retrieveTVShowById(res, id);
    });
    
    router.get('/user/favorites', this.validateAuth, async (req, res) => {
      var id = req.user.id;
      console.log('Query single favorites list for user with id: ' + id);
      try {
        var favorites = await this.Favorites.retrieveFavorites(id);

        var allmovies = await Promise.all(favorites.movies.map(async (movieId: string) => {
          var movie = await this.Movies.fetchMovieById(movieId);
          var tvshow = await this.TVShows.fetchShowById(movieId);
          if (movie) {
            return movie;
          } 
          return tvshow;
        }));

        console.log('allmovies: ' + allmovies);

        var result = {
          movies: allmovies,
          user: req.user
        };


        res.json(result);
      }
      catch (e) {
        console.error(e);
      }
        
    });

    router.post('/user/favorites/:movieId', this.validateAuth, async (req, res) => {
      var userId = req.user.id;
      var movieId = req.params.movieId.toString();
      console.log('Add movie with id: ' + movieId + ' to favorites list of user with id: ' + userId);
      await this.Favorites.addMovieToFavorites(res, userId, movieId);
    });

    router.post('/favorites/:userId/:movieId', async (req, res) => {
      var userId = req.params.userId;
      var movieId = req.params.movieId;
      console.log('Add movie with id: ' + movieId + ' to favorites list of user with id: ' + userId);
      await this.Favorites.addToFavoritesList(res, userId, movieId);
    });

    router.delete('/user/favorites/:movieId', this.validateAuth, async (req, res) => {
      var userId = req.user.id;
      var movieId = req.params.movieId.toString();
      console.log('Remove movie with id: ' + movieId + ' from favorites list of user with id: ' + userId);
      await this.Favorites.removeMovieFromFavorites(res, userId, movieId);
    });
    
    router.get('/allContent', async (req, res) => {
      console.log('Query all content');
      try {

        var movies = await this.Movies.retrieveContent();
        var shows = await this.TVShows.retrieveContent();
  
        var allContent = [...movies, ...shows]
        allContent.sort((a, b) => (a['tmdb_id'] > b['tmdb_id']) ? 1 : -1);
       
        res.json(allContent);
      } catch (e) {
        console.error(e);
      }
    });


    this.expressApp.use('/', router);

    this.expressApp.use('/', express.static(__dirname+'/../angular/browser'));
  }
}
export { App }