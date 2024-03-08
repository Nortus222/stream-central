export interface Cast {
    gender: number;
    id: number;
    name: string;
    profile_path: string | null;
    character: string;
    order: number;
}

export interface Keyword {
    id: number;
    name: string;
}

export interface Rating {
    source: string;
    value: number | null;
    score: number | null;
    votes: number | null;
    popular?: any;
    url?: string | null;
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface Content {
    backdrop: string;
    budget: number;
    casts: Cast[];
    genres: Genre[];
    imdb_id: string;
    keywords: Keyword[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster: string;
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    streams: any[];
    streamingInfo: any[];
    tagline: string;
    title: string;
    tmdb_id: number;
    trailer: string;
    watch_providers: any[];
}

export interface RootObject {
    movies: Content[];
}