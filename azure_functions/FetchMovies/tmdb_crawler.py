from tmdbv3api import TMDb, Movie, Genre, Discover, TV
import json
import os
from dotenv import load_dotenv

keys_save = ('budget', 'genres', 'id', 'imdb_id', 'original_language', 'original_title', 'overview', 'popularity', 'production_countries', 'release_date', 'revenue', 'runtime', 'spoken_languages', 'status', 'tagline', 'title', 'casts',  'keywords')
cast_keys_save = ('id', 'gender', 'name', 'profile_path', 'character', 'order') 
tv_keys_save = ('id', 'genres', 'first_air_date', 'homepage', 'last_air_date', 'number_of_episodes', 'number_of_seasons', 'origin_country', 'original_name', 'overview', 'popularity', 'status', 'casts', 'keywords')

def get_popular_movies_sample():
  tmdb = init_tmdb()
  with open("tmdb_sample_movies.json", "w") as outfile:
    outfile.write('[')

    for movie in fetch_popular_movies():
      outfile.write(json.dumps(movie, indent=4))
      outfile.write(',\n')

    outfile.seek(outfile.tell() - 2, 0)
    outfile.write(']')




def get_genres_sample():
  tmdb = init_tmdb()
  with open("tmdb_sample_genres.json", "w") as outfile:
    outfile.write('[')

    for genre in fetch_genres():
      genre['movies'] = [m for m in fetch_movies_by_genre(genre['id'])]

      outfile.write(json.dumps(genre, indent=4))
      outfile.write(',\n')

    outfile.seek(outfile.tell() - 2, 0)
    outfile.write(']')





def init_tmdb():
  tmdb = TMDb()
  load_dotenv()
  tmdb.api_key = os.getenv('TMDB_API_KEY')
  tmdb.language = 'en'
  tmdb.debug = False
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

def fetch_popular_tv_shows():
  tv = TV()
  popular = tv.popular()
  for item in popular:
    details = fetch_tv_show_details(item.id)
    # print(parse_providers(tv.watch_providers(item.id)))
    # print(tv.images(item.id))
    
    # break
    yield details

def parse_providers(providers):
  json = {}

  data = providers['results']

  for results in data:
    if (results['results'] == 'US'):
      json['link'] = results['US'][0]
      json['providers'] = results['US'][1][results['US'][1]['US']]
      return json


def fetch_tv_show_details(tv_id, keys_save=tv_keys_save):
  tv = TV()
  details = tv.details(tv_id)
  json = {}
  json['type'] = 'tv'
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


def fetch_movie_details(movie_id, keys_save=keys_save):
  movie = Movie()
  details = movie.details(movie_id)
  json = {}
  json['type'] = 'movie'
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
  fetch_tv_show_details(65701)