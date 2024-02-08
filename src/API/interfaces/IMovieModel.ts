import Mongoose = require("mongoose");

interface IMovieModel extends Mongoose.Document {
    budget: number;
    genres: {
        id: number;
        name: string;
    }[];
    tmdb_id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    tagline: string;
    title: string;
    vote_average: number;
    vote_count: number;
    casts: {
        cast: {
            gender: number;
            id: number;
            name: string;
            profile_path: string;
            character: string;
            order: number;
        }[];
    };
    keywords: {
        keywords: {
            id: number;
            name: string;
        }[];
    };
}
export {IMovieModel};