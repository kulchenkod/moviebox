import React from "react";
import { observer, inject } from 'mobx-react';

import Movie from "../Movie/Movie";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";
import "./main.css";

@inject('movieStore')
@observer
class Main extends React.Component {

  async componentDidMount() {
    const { page } = this.props.match.params;
    const { fetchMovie, fetchGenre } = this.props.movieStore
    await Promise.all([fetchMovie(page), fetchGenre()])
  }

  renderMovies = (item) => {
    return (<Movie 
      item={item}
      key={`movie-${item.id}`}
      genreObj={this.props.movieStore.genres}
      id={item.id}
    />)
  }

  render() {
    const { movies, totalPages, isMoviesLoading } = this.props.movieStore;
    return (
      <div className="main layout">
        { isMoviesLoading ? <Loading /> : movies.map(this.renderMovies) }
        { totalPages > 1 && !isMoviesLoading && <Pagination /> }
      </div>
    )
  }
}
export default Main;


