import React from "react";
import { inject, observer } from 'mobx-react';
import { withRouter } from "react-router";

import './movie.css';

@inject('movieStore')
@observer
class Movie extends React.Component {

  renderGenre = ((genre,i,arr) => {
    return (i < arr.length - 1) ? this.props.genreObj[genre] + ', ' : this.props.genreObj[genre];
  })

  detailsPage = (event) => {
    const { id } = this.props;
    this.props.history.push(`/movie/${id}`)
  }

  render() {
    const { item } = this.props;
    return (
      <div className="movie" onClick={this.detailsPage}>
        <div className="movie_poster">
          <img className="movie_poster-img" src={process.env.REACT_APP_IMG_URL+item.poster_path} alt=""/>
          <span className="movie_poster-year">{item.release_date.split('-')[0]}</span>
        </div>
        <div className="movie_info">
          <div className="movie_description">
            <span className="movie_name">{item.title}</span>
            <span className="movie_genre">{item.genre_ids.map(this.renderGenre)}</span>
          </div>
          <div className="movie_rang">{(Number.isInteger(item.vote_average)) ? 
            item.vote_average + '.0' : 
            item.vote_average}
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Movie);