import json
import os
import requests
from dotenv import load_dotenv
import time

keys_save = ('ratings', 'streams', 'watch_providers', 'keywords', 'poster', 'backdrop', 'trailer')

def get_ratings_sample():
  movies = read_movies_json()
  with open("tmdb_movies_sample_with_ratings.json", "w") as outfile:
    outfile.write('[')
    for movie in movies:
      ratings = get_ratings_imdb(movie)
      movie.update(ratings)

      outfile.write(json.dumps(movie, indent=4))
      outfile.write(',\n')
      
      time.sleep(1.5)  # Wait for 1.5 seconds due to the rate limit of the API

    outfile.seek(outfile.tell() - 2, 0)
    outfile.write(']')


def read_movies_json() -> json:
  with open('tmdb_sample_movies.json', 'r') as file:
    data = json.load(file)
    
  return data


def get_ratings_imdb(movie):
  load_dotenv()
  api_key = os.getenv('RAPID_API_KEY')
  host = 'mdblist.p.rapidapi.com'
  url = f"https://{host}/"

  headers = {
	"X-RapidAPI-Key": api_key,
	"X-RapidAPI-Host": host
  }

  querystring = {"i": movie['imdb_id']}

  response = requests.get(url, headers=headers, params=querystring)
  
  data = response.json()

  dict = {}
  for key in data.keys():
    if key in keys_save:
      dict[key] = data[key]

  return dict

def get_ratings_tmdb(tmdb_id, type):
  load_dotenv()
  api_key = os.getenv('RAPID_API_KEY')
  host = 'mdblist.p.rapidapi.com'
  url = f"https://{host}/"

  headers = {
	"X-RapidAPI-Key": api_key,
	"X-RapidAPI-Host": host
  }

  if (type == 'tv'):
    type= 'show'

  querystring = {"tm": tmdb_id, "m": type}

  response = requests.get(url, headers=headers, params=querystring)
  
  data = response.json()

  dict = {}
  for key in data.keys():
    if key in keys_save:
      dict[key] = data[key]

  return dict

