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
    const { fetchMovie, fetchGenre } = this.props
    await Promise.all([fetchMovie(page), fetchGenre()])
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
    console.log('MOOOOOOOVVVVVVIIIIIIEEEEEESSSS',movies)
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
    fetchMovie: (page) => dispatch(actions.fetchMovie(page)),
    fetchGenre: () => dispatch(actions.fetchGenre())
  }
}

export default connect(
  mapStateToProps,
  mapDispatcToProps
)(Main);



