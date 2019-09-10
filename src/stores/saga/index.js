import { call, put, takeEvery } from 'redux-saga/effects';

import { 
    REQUEST_GENRE_DATA, 
    REQUEST_MOVIE_DATA,
    REQUEST_DETAILS_DATA,
    REQUEST_FAVORITES_DATA, 
    reciveMovieData, 
    reciveGenreData,
    reciveDetailsData,
    reciveFavoritesData
} from '../actions/action';
import { fetchMovie, fetchGenre, fetchDetails, fetchFavorites } from '../../api/api';

function* getMovie(page) {
    try {
        const data = yield call(fetchMovie, page);
        yield put(reciveMovieData(data));
    } catch (e) {
        console.log(e, 'Error');
    }
}

function* getGenre() {
    try {
        const data = yield call(fetchGenre);
        yield put(reciveGenreData(data));
    } catch (e) {
        console.log(e, 'ERROR');
    }
}

function* getDetails(movieId) {
    try {
        const data = yield call(fetchDetails, movieId);
        yield put(reciveDetailsData(data));
    } catch (e) {
        console.log(e, 'ERROR');
    }
}

function* getFavorites(favorites) {
    try {
        const data = yield call(fetchFavorites, favorites);
        yield put(reciveFavoritesData(data));
    } catch (e) {
        console.log(e, 'ERROR');
    }
}

export function* mySaga() {
    yield takeEvery(REQUEST_MOVIE_DATA, getMovie);
    yield takeEvery(REQUEST_GENRE_DATA, getGenre);
    yield takeEvery(REQUEST_DETAILS_DATA, getDetails);
    yield takeEvery(REQUEST_FAVORITES_DATA, getFavorites);
}