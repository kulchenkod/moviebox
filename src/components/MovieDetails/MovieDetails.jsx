import React from 'react';
import { inject, observer } from 'mobx-react';

import './movieDetails.css';
import Loading from '../Loading/Loading';

@inject('movieStore')
@observer
class MovieDetails extends React.Component {

    constructor(props) {
        super(props);
        this.props.movieStore.favorites = JSON.parse(localStorage.getItem('favorites')) || [] ;
    }

    async componentDidMount() {
        const { movieStore: { fetchDetailsMovie }, match: { params: { id } } } = this.props;
        await fetchDetailsMovie(id);
    }

    renderGenre = ((genre,i,arr) => {
        return (i < arr.length - 1) ? genre.name + ', ' : genre.name;
    })

    addToFavorites = () => {
        const { favorites, detailsMovie } = this.props.movieStore;
        if (!favorites.find(movie => movie.id === detailsMovie.id)) {
            favorites.push(detailsMovie);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            console.log(JSON.parse(localStorage.getItem('favorites')));
            
        } 
    }

    removeFromFavorites = () => {
        const { favorites, detailsMovie } = this.props.movieStore;
        const filter = favorites.filter(movie => movie.id !== detailsMovie.id);
        localStorage.setItem('favorites', JSON.stringify(filter));
        this.props.movieStore.favorites = JSON.parse(localStorage.getItem('favorites'));
        console.log(JSON.parse(localStorage.getItem('favorites')));
    }

    render() {
        const { detailsMovie, isDetailsLoading, favorites } = this.props.movieStore;
        return ( isDetailsLoading ? <Loading /> :
            <div className="movieDetails">
                <div className="movieDetails_header">
                    <img className="movieDetails_img" src={process.env.REACT_APP_IMG_URL_ORIGINAL+detailsMovie.backdrop_path} alt="MovieImg"/>
                    <div className="movieDetails_info">
                        <h1 className="movieDetails_title">{detailsMovie.title}</h1>
                        <div className="movieDetails_info-details">
                            <span className="movieDetails_year">{detailsMovie.release_date && detailsMovie.release_date.split('-')[0]}</span>
                            <div className="movieDetails_genre">{detailsMovie.genres && detailsMovie.genres.map(this.renderGenre)}</div>
                        </div>
                    </div>
                </div>
                <div className="movieDetails_main">
                    <div className="movieDetails_main-menu">
                        <div className="movieDetails_poster">
                            <img src={process.env.REACT_APP_IMG_URL_ORIGINAL+detailsMovie.poster_path} alt="" className="movieDetails_poster-img"/>
                        </div>
                        {
                            (favorites.find(movie => movie.id === detailsMovie.id)) ?
                                <button className="movieDetails_button" onClick={this.removeFromFavorites} >Remove from favorites <i className="far fa-star"></i><i className="fas fa-star"></i></button> 
                                :
                                <button className="movieDetails_button" onClick={this.addToFavorites} >Add to favorites <i className="far fa-star"></i><i className="fas fa-star"></i></button> 
                        }
                    </div>
                    <div className="movieDetails_overview">
                        <h2 className="movieDetails_overview-title">Overview</h2>
                        <p className="movieDetails_overview-text">{detailsMovie.overview}</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default MovieDetails;