import Mongoose = require("mongoose");

interface IMovieModel extends Mongoose.Document {
    tmdb_id: { type: Number, required: true },
    budget: Number,
    genres: [
        {
            id: Number,
            name: String
        }
    ],
    imdb_id: String,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    production_countries: [
        {
            iso_3166_1: String,
            name: String
        }
    ],
    release_date: String,
    revenue: Number,
    runtime: Number,
    spoken_languages: [
        {
            english_name: String,
            iso_639_1: String,
            name: String
        }
    ],
    status: String,
    tagline: String,
    title: String,
    vote_average: Number,
    vote_count: Number,
    casts: {
        cast: [
            {
                gender: Number,
                id: Number,
                name: String,
                profile_path: String,
                character: String,
                order: Number
            }
        ],
    },
    keywords: {
        keywords: [
            {
                id: Number,
                name: String
            }
        ]
    },
    ratings: [
        {
            source:  String,
            value:  Number,
            score:  Number,
            votes:  Number,
            popular:  Number
        }
    ],
    streams: [
        {
            id:  Number,
            name:  String,
        }
    ],
    watch_providers: [
        {
            id:  Number,
            name:  String,
        }
    ],
    trailer: String,
    type: String,
    poster: String,
    backdrop: String,
    streamingInfo: [
        {
            service: String,
            streamingType: String,
            quality: String,
            link: String,
            videoLink: String,
            leaving: Number,
            availableSince: Number,
        }
    ]
    
}
export {IMovieModel};