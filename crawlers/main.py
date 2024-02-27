from tmdb_crawler import *
from ratings_crawler import *
from streams_crawler import *


def main():

  counter = 0

  with open("tmdb_sample_movies.json", "w") as outfile:
    outfile.write('[')

    for movie in fetch_popular_movies():
      ratings = get_ratings_imdb(movie)
      movie.update(ratings)
      # streaming = fetch_movie_streams(movie['imdb_id'])
      streaming = {'streamingInfo': []}
      movie.update(streaming)

      outfile.write(json.dumps(movie, indent=4))
      outfile.write(',\n')
      if counter > 10:
        break
      counter += 1

    outfile.seek(outfile.tell() - 2, 0)
    outfile.write(']')


if __name__ == '__main__':
  main()