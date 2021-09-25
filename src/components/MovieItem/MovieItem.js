import React, { Component } from 'react';
import store from '../../redux/store';
import './MovieItem.css';

class MovieItem extends Component {
    state = {
        favorites: [],
    };

    componentDidMount() {
        store.subscribe(() => {
            const state = store.getState();
            // console.log(state);
            this.setState({
                favorites: state.favorites,
            });
        });
    }

    checkMovieInFavorites = (imdbID) => {
        const selected = this.state.favorites.find((item) => {
            return item.imdbID === imdbID;
        });
        if (selected) {
            return true;
        }
    };

    addMovieToFavorites = (imdbID) => {
        store.dispatch({
            type: 'ADD_MOVIE_TO_FAVORITES',
            payload: {
                imdbID: imdbID,
            },
        });
    };
    render() {
        const { Title, Year, Poster, imdbID } = this.props;
        // console.log(this.props)
        return (
            <article className="movie-item" key={imdbID}>
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">
                        {Title}&nbsp;({Year})
                    </h3>
                    <button
                        onClick={() => this.addMovieToFavorites(imdbID)}
                        type="button"
                        className="movie-item__add-button"
                        disabled={this.checkMovieInFavorites(imdbID)}
                    >
                        {!this.checkMovieInFavorites(imdbID)
                            ? 'Add to Favorites!'
                            : 'Just added'}
                    </button>
                </div>
            </article>
        );
    }
}

export default MovieItem;
