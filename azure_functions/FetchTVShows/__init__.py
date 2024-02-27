import datetime
import logging
import os
from time import sleep

import azure.functions as func
from pymongo import MongoClient

from .ratings_crawler import get_ratings_tmdb
from .tmdb_crawler import fetch_popular_tv_shows, init_tmdb
from .streams_crawler import fetch_streams_tmdb
from dotenv import load_dotenv


def main(mytimer: func.TimerRequest) -> None:
    utc_timestamp = datetime.datetime.utcnow().replace(
        tzinfo=datetime.timezone.utc).isoformat()

    iteration_count = 0
    start_time = datetime.datetime.now()

    logging.info('Python timer trigger function ran at %s', utc_timestamp)

    init_tmdb()

    load_dotenv()

    uri = os.getenv('MONGO_CONNECTION_STRING')

    client = MongoClient(uri)

    db = client['stream-central-db']
    collection = db['tvshows']

    for show in fetch_popular_tv_shows():
        try:
            ratings = get_ratings_tmdb(show['tmdb_id'], show['type'])
            show.update(ratings)
            streaming = fetch_streams_tmdb(show['tmdb_id'], show['type'])
            show.update(streaming)

            res = collection.find_one_and_update({'tmdb_id': show['tmdb_id']}, {'$set': show}, upsert=True)
            
            if (res == None):
                collection.insert_one(show)

            logging.info(f'show {show["original_name"]} added to db')
        except Exception as e:
            logging.error(e)
        
        if ((datetime.datetime.now() - start_time).total_seconds() > 240):
            break

        if (iteration_count > 50):
            break
        
        iteration_count += 1
        sleep(2)
