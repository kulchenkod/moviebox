export const isFavoriteMovie = (state) => {
    return state.favorites.includes(state.detailsMovie.id);
}
