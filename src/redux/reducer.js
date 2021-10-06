const initialState = {
    movies: [],
    favorites: [],
    searchLine: '',
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SEARCHING_MOVIES':
            return {
                ...state,
                movies: action.payload.searchingMovies,
            };
        case 'ADD_MOVIE_TO_FAVORITES':
            const movie = state.movies.find(
                (item) => item.imdbID === action.payload.imdbID
            );
            const addedMovie = state.favorites.find(
                (item) => item.imdbID === action.payload.imdbID
            );
            if (!addedMovie) {
                const favorites = [...state.favorites, movie];
                return {
                    ...state,
                    favorites,
                };
            }
            return state;

        case 'DELETE_MOVIE_FROM_FAVORITES':
            const removable = [
                ...state.favorites.filter(
                    (item) => item.imdbID !== action.payload.imdbID
                ),
            ];
            return { ...state, favorites: removable };

        case 'CHANGE_SEACHLINE':
            return {
                ...state,
                searchLine: action.payload.searchValue,
            };

        default:
            return state;
    }
}
export default reducer;
