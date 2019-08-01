import { observable, action } from "mobx";
import React from "react";
import axios from "axios";
import { create, persist } from 'mobx-persist'

class MovieStore extends React.Component {

    @observable movies = [];
    @observable genres = {};
    @observable totalPages = 0;
    @observable isMoviesLoading = true;
    @observable isDetailsLoading = true;
    @observable detailsMovie = {};
    @persist('list') @observable favorites = [];

    @action hydrate = create({})

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
    
    @action fetchGenre = async () => {
        try {
            const { data } = await axios.get("/genre/movie/list");
            this.genres = data.genres.reduce((start, item) => ({
                ...start,
                [item.id]: item.name.charAt(0).toUpperCase() + item.name.slice(1)
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