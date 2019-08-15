import React from 'react';
import { observable, action, computed } from "mobx";
import axios from "axios";
import { persist } from "mobx-persist";

class MovieStore extends React.Component{

    @observable movies = [];
    @observable genres = {};
    @observable totalPages = 0;
    @observable isMoviesLoading = true;
    @observable isDetailsLoading = true;
    @observable detailsMovie = {};
    @persist('list') @observable favorites = [];

    @action fetchMovie = async (page) => {
        try {
            const { data } = await axios.get("/movie/now_playing", {
                params: {
                    page: page
                }
            });
            this.movies = data.results;
            this.totalPages = data.total_pages;
            this.isMoviesLoading = false;
            this.isDetailsLoading = true;
        } catch(e) {
            this.isMoviesLoading = true;
            console.log(e, 'Error');
        }
    }

    @action addToFavorites = () => {
        this.favorites.push(this.detailsMovie);
    }

    @action removeFromFavorites = () => {
        this.favorites = this.favorites.filter(movie => movie.id !== this.detailsMovie.id);
    }

    @computed get isFavoriteMovie() {
        if(this.favorites.find(movie => movie.id === this.detailsMovie.id)) {
            return true;
        }
        return false;
    }
    
    @action fetchGenre = async () => {
        try {
            const { data } = await axios.get("/genre/movie/list");
            this.genres = data.genres.reduce((start, item) => ({
                ...start,
                [item.id]: item.name
            }), {});
        } catch(e) {
            console.log(e, 'Error');
        }
    }

    @action fetchDetailsMovie = async (movieId) => {
        this.detailsMovie = {};
        try {
            const { data } = await axios.get(`/movie/${movieId}`);
            this.detailsMovie = data;
            this.isDetailsLoading = false;
        } catch(e) {
            this.isDetailsLoading = true;
            console.log(e, 'Error');
        }
    }
 }
export default new MovieStore();