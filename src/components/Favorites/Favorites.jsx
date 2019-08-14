import React from "react";
import { observer, inject } from 'mobx-react';

import Movie from "../Movie/Movie";

@inject('movieStore')
@observer
class Favorites extends React.Component {

  renderMovies = (item) => {
    return (<Movie 
      item={item}
      key={`movie-${item.id}`}
      genreObj={item.genres}
      id={item.id}
    />)
  }

  render() {
    const { favorites } = this.props.movieStore;
    return (
      <div className="main layout">
        { favorites.map(this.renderMovies) }
      </div>
    )
  }
}
export default Favorites;


