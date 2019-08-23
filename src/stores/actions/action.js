import axios from "axios";

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_ERROR = 'FETCH_MOVIES_ERROR';

export const FETCH_GENRE = 'FETCH_GENRE';
export const FETCH_GENRE_SUCCESS = 'FETCH_GENRE_SUCCESS';
export const FETCH_GENRE_ERROR = 'FETCH_GENRE_ERROR';

export const FETCH_DETAILS = 'FETCH_DETAILS';
export const FETCH_DETAILS_SUCCESS = 'FETCH_DETAILS_SUCCESS';
export const FETCH_DETAILS_ERROR = 'FETCH_DETAILS_ERROR';

export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const FETCH_FAVORITES_SUCCESS = 'FETCH_FAVORITES_SUCCESS';
export const FETCH_FAVORITES_ERROR = 'FETCH_FAVORITES_ERROR';

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

export const fetchMovie = (page) => async dispatch => {
    dispatch({
        type: FETCH_MOVIES
    });
    try {
        const { data } = await axios.get("/movie/now_playing", {
            params: {
                page: page
            }
        })
        dispatch({
            type: FETCH_MOVIES_SUCCESS,
            payload: {
                data: data.results,
                totalPages: data.total_pages,
                isMoviesLoading: false,
                isDetailsLoading: true
            }
        })
    } catch(e) {
        dispatch({
            type: FETCH_MOVIES_ERROR,
            payload: {
                error: e,
                isMoviesLoading: true,
                isDetailsLoading: false
            }
        })
        console.log(e, 'Error');
    }
}

export const fetchGenre = () => async dispatch => {
    dispatch({
        type: FETCH_GENRE
    });
    try {
        const { data } = await axios.get("/genre/movie/list");
        dispatch({
            type: FETCH_GENRE_SUCCESS,
            payload: {
                data: data.genres.reduce((start, item) => ({
                    ...start,
                    [item.id]: item.name
                }), {})
            }
        })
    } catch(e) {
        dispatch({
            type: FETCH_GENRE_ERROR,
            payload: {
                error: e
            }
        })
        console.log(e, 'Error');
    }
}

export const fetchDetails = (movieId) => async dispatch => {
    dispatch({
        type: FETCH_DETAILS
    });
    try {
        const { data } = await axios.get(`/movie/${movieId}`);
        dispatch({
            type: FETCH_DETAILS_SUCCESS,
            payload: {
                detailsMovie: data,
                isDetailsLoading: false
            }
        })
    } catch(e) {
        dispatch({
            type: FETCH_DETAILS_ERROR,
            payload: {
                isDetailsLoading: true
            }
        })
        console.log(e, 'Error');
    }
}

export const fetchFavorites = (favorites) => async dispatch => {
    dispatch({
        type: FETCH_FAVORITES
    })
    const inquiries = favorites.map(id => {
        return axios.get(`/movie/${id}`);
    });
    try {
        const requestDetailsMovie = await Promise.all(inquiries);
        dispatch({
            type: FETCH_FAVORITES_SUCCESS,
            payload: requestDetailsMovie.map(movie => movie.data)
        })
    } catch(e) {
        dispatch({
            type: FETCH_FAVORITES_ERROR
        })
        console.log(e, 'Error');
    }
}

export const addToFavorites = () => dispatch => {
    dispatch({
        type: ADD_TO_FAVORITES
    })
}

export const removeFromFavorites = () => dispatch => {
    dispatch({
        type: REMOVE_FROM_FAVORITES
    })
}