import logging
from time import sleep
from pymongo import MongoClient
from tmdb_crawler import *
from ratings_crawler import *
from streams_crawler import *
from dotenv import load_dotenv

def main():

  tmdb_ids = [
    1399,  # Game of Thrones
    66732,  # Stranger Things
    1399,  # The Crown
    1396,  # Breaking Bad
    82856,  # The Mandalorian
    1668,  # Friends
    2316,  # The Office (US)
    71912,  # The Witcher
    76479,  # The Boys
    71446,  # Money Heist
    42009,  # Black Mirror
    60625,  # Rick and Morty
    75006,  # The Umbrella Academy
    63247,  # Westworld
    1402,  # The Walking Dead
    63351,  # Narcos
    19885,  # Sherlock
    60574,  # Peaky Blinders
    48891,  # Brooklyn Nine-Nine
    79159,  # Chernobyl
  ]
  
  init_tmdb()

  load_dotenv()

  uri = os.getenv('MONGO_CONNECTION_STRING')

  client = MongoClient(uri)

  db = client['stream-central-db']
  collection = db['tvshows']


  for id in tmdb_ids:
      try:
          
          show = fetch_tv_show_details(id)

          #check if the movie is alraedy in db
          if collection.find_one({'tmdb_id': show['tmdb_id']}):
              logging.info(f'show {show["name"]} already in db')
              print(f'show {show["name"]} already in db')
              continue


          ratings = get_ratings_tmdb(show['tmdb_id'], show['type'])
          show.update(ratings)
          streaming = fetch_streams_tmdb(show['tmdb_id'], show['type'])
          show.update(streaming)

          res = collection.find_one_and_update({'tmdb_id': show['tmdb_id']}, {'$set': show}, upsert=True)

          logging.info(f'show {show["name"]} added to db')
          print(f'show {show["name"]} added to db')
      except Exception as e:
          logging.error(e)
          return
    
      sleep(2)

  # with open("tmdb_sample_movies.json", "w") as outfile:
  #   outfile.write('[')

  #   for movie in fetch_popular_movies():
  #     ratings = get_ratings_imdb(movie)
  #     movie.update(ratings)
  #     # streaming = fetch_movie_streams(movie['imdb_id'])
  #     streaming = {'streamingInfo': []}
  #     movie.update(streaming)

  #     outfile.write(json.dumps(movie, indent=4))
  #     outfile.write(',\n')
  #     if counter > 10:
  #       break
  #     counter += 1

  #   outfile.seek(outfile.tell() - 2, 0)
  #   outfile.write(']')


if __name__ == '__main__':
  main()