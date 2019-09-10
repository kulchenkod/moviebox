import * as action from "../actions/action";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
    movies: [],
    genres: {},
    totalPages: 0,
    isMoviesLoading: true,
    isDetailsLoading: true,
    detailsMovie: {},
    favorites: [],
    favoritesListToShow: []
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'RECIVE_MOVIE_DATA':
            return {
                ...state,
                movies: action.data.payload.data,
                totalPages: action.data.payload.totalPages,
                isMoviesLoading: action.data.payload.isMoviesLoading,
                isDetailsLoading: action.data.payload.isDetailsLoading
            };
        case 'RECIVE_GENRE_DATA':
                return {
                    ...state,
                    genres: action.data.payload.data
                };
        case 'RECIVE_DETAILS_DATA':
                return {
                    ...state,
                    isDetailsLoading: action.data.payload.isDetailsLoading,
                    detailsMovie: action.data.payload.detailsMovie
                };
        case 'ADD_TO_FAVORITES':
            return {
                ...state,
                favorites: [...state.favorites, state.detailsMovie.id]
            };
        case 'REMOVE_FROM_FAVORITES':
            return {
                ...state,
                favorites: state.favorites.filter(movie => movie !== state.detailsMovie.id)
            } 
        case 'RECIVE_FAVORITES_DATA': 
            return {
                ...state,
               favoritesListToShow: action.data.payload
            };
        default: 
            return state;
    }
}

const persistConfig = {
    key: 'root',
    storage
}

export default persistReducer(persistConfig, reducer)
