import datetime
import logging
import os
from time import sleep

from dotenv import load_dotenv

import azure.functions as func
from pymongo import MongoClient

from .ratings_crawler import get_ratings_imdb

from .tmdb_crawler import fetch_popular_movies, init_tmdb
from .streams_crawler import fetch_movie_streams


def main(mytimer: func.TimerRequest) -> None:

    iteration_count = 0
    start_time = datetime.datetime.now()

    utc_timestamp = datetime.datetime.utcnow().replace(
        tzinfo=datetime.timezone.utc).isoformat()

    logging.info('Python timer trigger function ran at %s', utc_timestamp)

    init_tmdb()

    load_dotenv()

    uri = os.getenv('MONGO_CONNECTION_STRING')

    client = MongoClient(uri)
    collection = client['movies']

    for movie in fetch_popular_movies():
        try:

            #check if the movie is alraedy in db
            if collection.find_one({'tmdb_id': movie['tmdb_id']}):
                logging.info(f'movie {movie["title"]} already in db')
                continue

            ratings = get_ratings_imdb(movie)
            movie.update(ratings)
            streaming = fetch_movie_streams(movie['imdb_id'])
            movie.update(streaming)

            collection.find_one_and_update({'imdb_id': movie['imdb_id']}, {'$set': movie})

            logging.info(f'movie {movie["title"]} added to db')
        except Exception as e:
            logging.error(e)
            return
        
        if ((datetime.datetime.now() - start_time).total_seconds() > 240):
            break

        if (iteration_count > 20):
            break
        
        iteration_count += 1
        sleep(2)

    

