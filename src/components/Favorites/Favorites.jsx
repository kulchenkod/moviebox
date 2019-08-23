import React from "react";
import { connect } from "react-redux";

import * as actions from "../../stores/actions/action";
import Movie from "../Movie/Movie";

class Favorites extends React.Component {

  async componentDidMount() {
    const { fetchFavorites, favorites } = this.props;
    await fetchFavorites(favorites)
  }


  renderMovies = (item) => {
    return (<Movie 
      item={item}
      key={`movie-${item.id}`}
      genreObj={item.genres}
      id={item.id}
    />)
  }

  render() {
    const { favoritesListToShow } = this.props;
    return (
      <div className="main layout">
        { favoritesListToShow.map(this.renderMovies) }
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    favorites: store.favorites,
    favoritesListToShow: store.favoritesListToShow
  };
}

function mapDispatcToProps(dispatch) {
  return {
    fetchFavorites: (favorites) => dispatch(actions.fetchFavorites(favorites))
  }
}

export default connect(
  mapStateToProps,
  mapDispatcToProps
)(Favorites);


