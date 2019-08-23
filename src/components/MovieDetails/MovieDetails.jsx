import React from 'react';
import { connect } from "react-redux";

import * as actions from "../../stores/actions/action";
import { isFavoriteMovie } from "../../stores/selectors/selector";
import './movieDetails.css';
import Loading from '../Loading/Loading';

class MovieDetails extends React.Component {

    async componentDidMount() {
        const { match: { params: { id } }, fetchDetails } = this.props;
        await fetchDetails(id);
    }

    changeEventButtonFavorites = () => {
        const { isFavoriteMovie, addToFavorites, removeFromFavorites } = this.props;
        if(isFavoriteMovie) {
            return removeFromFavorites();
        }
        addToFavorites();
    }

    renderGenre = ((genre,i,arr) => {
        return (i < arr.length - 1) ? genre.name + ', ' : genre.name;
    })

    render() {
        const { detailsMovie, isDetailsLoading, isFavoriteMovie } = this.props;
        if(isDetailsLoading) {
            return <Loading />;
        }
        return (
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
                        <button className="movieDetails_button" onClick={this.changeEventButtonFavorites}>{ isFavoriteMovie ? 'Remove from favorites' : 'Add to favorites' }<i className="far fa-star"></i><i className="fas fa-star"></i></button>
                    </div>
                    <div className="movieDetails_overview">
                        <h2 className="movieDetails_overview-title">Overview</h2>
                        <p className="movieDetails_overview-text">{detailsMovie.overview}</p>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(store) {
    return {
        isFavoriteMovie: isFavoriteMovie(store),
        detailsMovie: store.detailsMovie,
        isDetailsLoading: store.isDetailsLoading
    };
  }
  
function mapDispatcToProps(dispatch) {
    return {
        fetchDetails: (id) => dispatch(actions.fetchDetails(id)),
        addToFavorites: () => dispatch(actions.addToFavorites()),
        removeFromFavorites: () => dispatch(actions.removeFromFavorites())
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatcToProps
)(MovieDetails);