import React from "react";
import { connect } from "react-redux";

import * as actions from "../../stores/actions/action";
import Movie from "../Movie/Movie";

class Favorites extends React.Component {

  async componentDidMount() {
    const { requestFavoritesData, favorites } = this.props;
    await requestFavoritesData(favorites);
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
    requestFavoritesData: (favorites) => dispatch(actions.requestFavoritesData(favorites))
  }
}

export default connect(
  mapStateToProps,
  mapDispatcToProps
)(Favorites);


