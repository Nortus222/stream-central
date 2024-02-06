from tmdbv3api import TMDb
from tmdbv3api import Movie
import json
import os
from dotenv import load_dotenv

def main():
  tmdb = TMDb()
  load_dotenv()
  tmdb.api_key = os.getenv('TMDB_API_KEY')
  tmdb.language = 'en'
  tmdb.debug = True
  movie = Movie()

  popular = movie.popular()
  
  keys_save = ('adult', 'belongs_to_collection', 'budget', 'genres', 'id', 'imdb_id', 'original_language', 'original_title', 'overview', 'popularity', 'poster_path', 'production_countries', 'release_date', 'revenue', 'runtime', 'spoken_languages', 'status', 'tagline', 'title', 'vote_average', 'vote_count', 'casts',  'keywords')

  with open("tmdb_sample.json", "w") as outfile:
    outfile.write('[')

    for item in popular:
      details = movie.details(item.id)
      dict = {}
      for key in details._json.keys():
        if (key not in keys_save):
          continue
        
        dict[key] = details._json[key]
      outfile.write(json.dumps(dict, indent=4))
      outfile.write(',\n')

    outfile.seek(outfile.tell() - 2, 0)
    outfile.write(']')
    
                      




if __name__ == '__main__':
  main()