import os
import json
import requests
from dotenv import load_dotenv
import time

keys_save = ('service', 'streamingType', 'quality', 'link', 'videoLink', 'leaving', 'availableSince')

def get_streams_sample():
  movies = load_movies()
  with open("tmdb_movies_sample_complete.json", "w") as outfile:
    outfile.write('[')
    for movie in movies:
      streams = fetch_movie_streams(movie['imdb_id'])
      movie.update(streams)

      outfile.write(json.dumps(movie, indent=4))
      outfile.write(',\n')

      time.sleep(1.5)  # Wait for 1.5 seconds due to the rate limit of the API
      
    outfile.seek(outfile.tell() - 2, 0)
    outfile.write(']')


def test():
  streams = fetch_movie_streams('tt0944947')
  print(streams)

def load_movies():
  with open('tmdb_movies_sample_with_ratings.json', 'r') as file:
    data = json.load(file)
  return data

def fetch_movie_streams(imdb_id):
  load_dotenv()
  api_key = os.getenv('RAPID_API_KEY')
  host = 'streaming-availability.p.rapidapi.com'
  url = f"https://{host}/get"

  headers = { 
    "X-RapidAPI-Key": api_key,
    "X-RapidAPI-Host": host
  }

  querystring = {"imdb_id": imdb_id, "output_language":"en"}

  response = requests.get(url, headers=headers, params=querystring)

  data = response.json()

  dict = {}

  info = data['result']['streamingInfo']

  if (info['us'] == None):
    dict['streamingInfo'] = []
  else:
    dict['streamingInfo'] = info['us']

  result = {}
  result['streamingInfo'] = []

  for stremin in dict['streamingInfo']:
    
    p = {}
    for key in stremin:
      if key in keys_save:
        p[key] = stremin[key]
    
    result['streamingInfo'].append(p)

  return result


if __name__ == '__main__':
  test()