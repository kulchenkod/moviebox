import axios from "axios";

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

export const REQUEST_MOVIE_DATA = 'REQUEST_MOVIE_DATA';
export const RECIVE_MOIVE_DATA = 'RECIVE_MOVIE_DATA';

export const REQUEST_GENRE_DATA = 'REQUEST_GENRE_DATA';
export const RECIVE_GENRE_DATA = 'RECIVE_GENRE_DATA';

export const REQUEST_DETAILS_DATA = 'REQUEST_DETAILS_DATA';
export const RECIVE_DETAILS_DATA = 'RECIVE_DETAILS_DATA';

export const REQUEST_FAVORITES_DATA = 'REQUEST_FAVORITES_DATA';
export const RECIVE_FAVORITES_DATA = 'RECIVE_FAVORITES_DATA';

export const requestMovieData = (page) => ({ type: REQUEST_MOVIE_DATA, page });
export const reciveMovieData = (data) => ({ type: RECIVE_MOIVE_DATA, data });

export const requestGenreData = () => ({ type: REQUEST_GENRE_DATA });
export const reciveGenreData = (data) => ({ type: RECIVE_GENRE_DATA, data });

export const requestDetailsData = (movieId) => ({ type: REQUEST_DETAILS_DATA, movieId });
export const reciveDetailsData = (data) => ({ type: RECIVE_DETAILS_DATA, data });

export const requestFavoritesData = (favorites) => ({ type: REQUEST_FAVORITES_DATA, favorites });
export const reciveFavoritesData = (data) => ({ type: RECIVE_FAVORITES_DATA, data });

export const addToFavorites = () => {
    return {
        type: ADD_TO_FAVORITES
    }
}

export const removeFromFavorites = () => {
    return {
        type: REMOVE_FROM_FAVORITES
    }
}