import React from "react";
import { observer, inject } from 'mobx-react';
import Movie from "../Movie/Movie";
import { hydrateStores } from '../../stores/index';

@inject('movieStore')
@observer
class Favorites extends React.Component {

  async componentDidMount() {
    const { fetchFavorites } = this.props.movieStore;
    await hydrateStores();
    await fetchFavorites();
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
    const { favoritesListToShow } = this.props.movieStore;
    console.log(favoritesListToShow)
    return (
      <div className="main layout">
        { favoritesListToShow.map(this.renderMovies) }
      </div>
    );
  }
}
export default Favorites;


