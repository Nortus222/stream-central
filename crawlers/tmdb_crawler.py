from tmdbv3api import TMDb
from tmdbv3api import Movie
import json


def main():
  tmdb = TMDb()
  tmdb.api_key = '536ca59623dab55deb3d16bc474ea2e0'
  tmdb.language = 'en'
  tmdb.debug = True
  movie = Movie()


  popular = movie.popular()
  
  keys_save = ('adult', 'backdrop_path', 'belongs_to_collection', 'budget', 'genres', 'id', 'imdb_id', 'original_language', 'original_title', 'overview', 'popularity', 'poster_path', 'production_countries', 'release_date', 'revenue', 'runtime', 'spoken_languages', 'status', 'tagline', 'title', 'video', 'vote_average', 'vote_count', 'casts',  'keywords')

  with open("tmdb_sample.json", "w") as outfile:
    outfile.write('[')

    for item in popular:
      details = movie.details(item.id)
      dict = {}
      for key in keys_save:
        if (key not in details._json.keys()):
          continue
        
        dict[key] = details._json[key]
      outfile.write(json.dumps(dict, indent=4))
      outfile.write(',\n')

    
    outfile.write(']')
    
                      




if __name__ == '__main__':
  main()