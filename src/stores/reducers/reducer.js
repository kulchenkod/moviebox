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
        case 'FETCH_MOVIES_SUCCESS':
            return {
                ...state,
                movies: action.payload.data,
                totalPages: action.payload.totalPages,
                isMoviesLoading: action.payload.isMoviesLoading,
                isDetailsLoading: action.payload.isDetailsLoading
            };
        case 'FETCH_GENRE_SUCCESS':
                return {
                    ...state,
                    genres: action.payload.data
                };
        case 'FETCH_DETAILS_SUCCESS':
                return {
                    ...state,
                    isDetailsLoading: action.payload.isDetailsLoading,
                    detailsMovie: action.payload.detailsMovie
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
        case 'FETCH_FAVORITES_SUCCESS': 
            return {
                ...state,
               favoritesListToShow: action.payload
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
