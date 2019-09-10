import React from "react";
import { connect } from "react-redux";

import * as actions from "../../stores/actions/action";
import Movie from "../Movie/Movie";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";
import "./main.css";

class Main extends React.Component {

  async componentDidMount() {
    const { page } = this.props.match.params;
    const { requestMovieData, requestGenreData } = this.props;
    await Promise.all([requestMovieData(page), requestGenreData()]);
  }

  renderMovies = (item) => {
    return (<Movie 
      item={item}
      key={`movie-${item.id}`}
      genreObj={this.props.genres}
      id={item.id}
    />)
  }

  render() {
    const { movies, totalPages, isMoviesLoading } = this.props;
    return (
      <div className="main layout">
        { isMoviesLoading ? <Loading /> : movies.map(this.renderMovies) }
        { totalPages > 1 && !isMoviesLoading && <Pagination /> }
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {
    movies: store.movies,
    genres: store.genres,
    totalPages: store.totalPages,
    isMoviesLoading: store.isMoviesLoading,
    isDetailsLoading: store.isDetailsLoading
  };
}

function mapDispatcToProps(dispatch) {
  return {
    requestMovieData: (page) => dispatch(actions.requestMovieData(page)),
    requestGenreData: () => dispatch(actions.requestGenreData())
  }
}

export default connect(
  mapStateToProps,
  mapDispatcToProps
)(Main);



