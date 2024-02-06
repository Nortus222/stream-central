from tmdbv3api import TMDb, Movie, Genre, Discover
import json
import os
from dotenv import load_dotenv

keys_save = ('adult', 'belongs_to_collection', 'budget', 'genres', 'id', 'imdb_id', 'original_language', 'original_title', 'overview', 'popularity', 'poster_path', 'production_countries', 'release_date', 'revenue', 'runtime', 'spoken_languages', 'status', 'tagline', 'title', 'vote_average', 'vote_count', 'casts',  'keywords')


def get_popular_movies_sample():
  tmdb = _init_tmdb()
  with open("tmdb_sample_movies.json", "w") as outfile:
    outfile.write('[')

    for item in fetch_popular_movies():
      outfile.write(json.dumps(item, indent=4))
      outfile.write(',\n')

    outfile.seek(outfile.tell() - 2, 0)
    outfile.write(']')




def get_genres_sample():
  tmdb = _init_tmdb()
  with open("tmdb_sample_genres.json", "w") as outfile:
    outfile.write('[')

    for item in fetch_genres():
      genre = {}
      for key in item.keys():
        genre[key] = item[key]

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
    yield item

def fetch_movies_by_genre(genre_id, number_of_movies=5):
  discover = Discover()
  count = 0
  movies = discover.discover_movies({'with_genres': genre_id})
  for item in movies['results']:
    if (count >= number_of_movies):
      break
    details = fetch_movie_details(item.id, keys_save=('id', 'title'))
    count += 1
    yield details
                    
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
    
    json[key] = details._json[key]

  return json




if __name__ == '__main__':
  get_genres_sample()