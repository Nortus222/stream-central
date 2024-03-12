import Mongoose = require("mongoose");

interface ITVShowModel extends Mongoose.Document {
  
  tmdb_id: Number;
  backdrop: string;
  first_air_date: string;
  genres: {
    id: Number;
    name: string;
  }[];
  homepage: string;
  keywords: {
    id: Number;
    name: string;
  }[];
  last_air_date: string;
  number_of_episodes: Number;
  number_of_seasons: Number;
  origin_country: string[];
  original_name: string;
  name: string;
  overview: string;
  popularity:  Number;
  poster: string;
  ratings: {
    source: String;
    value: Number;
    score: Number;
    votes: Number;
    popular: Number;
  }[];
  status: string;
  streamingInfo: {
    service: string;
    streamingType: string;
    link: string;
    availableSince: Number;
  }[];
  streams: {
    id: Number;
    name: string;
  }[];
  trailer: string;
  type: string;
  watch_providers: {
    id: Number;
    name: string;
  }[];
}
export {ITVShowModel};
    