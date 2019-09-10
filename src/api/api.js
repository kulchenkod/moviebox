import axios from 'axios';

export const fetchMovie = async (page) => {
    try {
        const { data } = await axios.get("/movie/now_playing", {
            params: {
                page: page.page
            }
        })
        return {
            payload: {
                data: data.results,
                totalPages: data.total_pages,
                isMoviesLoading: false,
                isDetailsLoading: true
            }
        }
    } catch(e) {
        console.log(e, 'Error');
    }
}

export const fetchGenre = async () => {
    try {
        const { data } = await axios.get("/genre/movie/list");
        return {
            payload: {
                data: data.genres.reduce((start, item) => ({
                    ...start,
                    [item.id]: item.name
                }), {})
            }
        }
    } catch(e) {
        console.log(e, 'Error');
    }
}

export const fetchDetails = async (movieId) => {
    try {
        const { data } = await axios.get(`/movie/${movieId.movieId}`);
        return {
            payload: {
                detailsMovie: data,
                isDetailsLoading: false
            }
        }
    } catch(e) {
        console.log(e, 'Error');
        return {
            payload: {
                isDetailsLoading: true
            }
        }
    }
}

export const fetchFavorites = async (favorites) => {
    const inquiries = favorites.favorites.map(id => {
        return axios.get(`/movie/${id}`);
    });
    try {
        const requestDetailsMovie = await Promise.all(inquiries);
        return {
            payload: requestDetailsMovie.map(movie => movie.data)
        }
    } catch(e) {
        console.log(e, 'Error');
    }
}