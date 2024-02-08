from tmdbv3api import TMDb, Movie, Genre, Discover
import json
import os
from dotenv import load_dotenv

keys_save = ('budget', 'genres', 'id', 'imdb_id', 'original_language', 'original_title', 'overview', 'popularity', 'poster_path', 'production_countries', 'release_date', 'revenue', 'runtime', 'spoken_languages', 'status', 'tagline', 'title', 'vote_average', 'vote_count', 'casts',  'keywords')
cast_keys_save = ('id', 'gender', 'name', 'profile_path', 'character', 'order') 

def get_popular_movies_sample():
  tmdb = _init_tmdb()
  with open("tmdb_sample_movies.json", "w") as outfile:
    outfile.write('[')

    for movie in fetch_popular_movies():
      outfile.write(json.dumps(movie, indent=4))
      outfile.write(',\n')

    outfile.seek(outfile.tell() - 2, 0)
    outfile.write(']')




def get_genres_sample():
  tmdb = _init_tmdb()
  with open("tmdb_sample_genres.json", "w") as outfile:
    outfile.write('[')

    for genre in fetch_genres():
      genre['movies'] = [m for m in fetch_movies_by_genre(genre['id'])]

      outfile.write(json.dumps(genre, indent=4))
      outfile.write(',\n')

    outfile.seek(outfile.tell() - 2, 0)
    outfile.write(']')





def _init_tmdb():
  tmdb = TMDb()
  load_dotenv()
  tmdb.api_key = os.getenv('TMDB_API_KEY')
  tmdb.language = 'en'
  tmdb.debug = True
  return tmdb

def fetch_genres():
  genre = Genre()
  genres = genre.movie_list()
  for item in genres:
    json = {}
    for key in item.keys():
      json[key] = item[key]
    yield json

def fetch_movies_by_genre(genre_id, number_of_movies=5):
  discover = Discover()
  count = 0
  movies = discover.discover_movies({'with_genres': genre_id})
  for item in movies['results']:
    if (count >= number_of_movies):
      break
    details = fetch_movie_details(item.id, keys_save=('id'))
    count += 1
    yield details['tmdb_id']
                    
def fetch_popular_movies():
  movie = Movie()
  popular = movie.popular()
  for item in popular:
    details = fetch_movie_details(item.id)
    yield details

def fetch_movie_details(movie_id, keys_save=keys_save):
  movie = Movie()
  details = movie.details(movie_id)
  json = {}
  for key in details._json.keys():
    if (key not in keys_save):
      continue
    if (key == 'casts'):
      json[key] = [c for c in parse_movie_cast(details._json)]
      continue
    
    if (key == 'id'):
      json['tmdb_id'] = details._json[key]
      continue

    json[key] = details._json[key]

  return json

def parse_movie_cast(json, keys_save=cast_keys_save, max_cast=20):
  cast = json['casts']['cast']
  count = 0
  for actor in cast:
    if (count >= max_cast):
      break
    actor_json = {}
    for key in actor.keys():
      if (key not in keys_save):
        continue
      actor_json[key] = actor[key]
    count += 1
    yield actor_json


if __name__ == '__main__':
  get_genres_sample()