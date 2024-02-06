import Mongoose = require("mongoose");

interface IMovieModel extends Mongoose.Document {
    adult: boolean;
    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string;
        backdrop_path: string;
    };
    budget: number;
    genres: {
        id: number;
        name: string;
    }[];
    id: number;
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
            adult: boolean;
            gender: number;
            id: number;
            known_for_department: string;
            name: string;
            original_name: string;
            popularity: number;
            profile_path: string;
            cast_id: number;
            character: string;
            credit_id: string;
            order: number;
        }[];
        crew: {
            adult: boolean;
            gender: number;
            id: number;
            known_for_department: string;
            name: string;
            original_name: string;
            popularity: number;
            profile_path: string;
            credit_id: string;
            department: string;
            job: string;
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