import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from '../../redux/store';
import './Favorites.css';

class Favorites extends Component {
    state = {
        title: '',
        movies: [],
        isClicked: false,
        favoritesID: '',
    };

    changeTitle = (e) => {
        this.setState({ title: e.target.value });
    };

    componentDidMount() {
        store.subscribe(() => {
            const state = store.getState();
            this.setState({
                movies: state.favorites,
            });
        });
    }

    deleteMovieFromFavorites = (imdbID) => {
        store.dispatch({
            type: 'DELETE_MOVIE_FROM_FAVORITES',
            payload: {
                imdbID: imdbID,
            },
        });
    };

    saveFavorites = (e) => {
        e.preventDefault();
        this.setState({ isClicked: true });
        const info = { title: this.state.title, movies: this.state.movies };
        fetch('https://acb-api.algoritmika.org/api/movies/list', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(info),
        })
            .then((response) =>
                response.json().then((result) => {
                    this.setState({ favoritesID: result.id });
                })
            )
            .catch((error) => console.log(error));
    };

    render() {
        return (
            <div className="favorites">
                <input
                    value={this.state.title}
                    placeholder="Enter the name of your Favorites List"
                    className="favorites__name"
                    onChange={this.changeTitle}
                    disabled={this.state.isClicked}
                />
                <ul className="favorites__list">
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                {item.Title} ({item.Year})
                                <button
                                    key={item.imdbID}
                                    type="button"
                                    className="favorites__delete"
                                    disabled={this.state.isClicked}
                                    onClick={() =>
                                        this.deleteMovieFromFavorites(
                                            item.imdbID
                                        )
                                    }
                                >
                                    Delete
                                </button>
                            </li>
                        );
                    })}
                </ul>
                {this.state.isClicked ? (
                    <button type="button" className="favorites__goto">
                        <Link
                            to={`/list/${this.state.favoritesID}`}
                            target="_blank"
                        >
                            Go to the List!
                        </Link>
                    </button>
                ) : (
                    <button
                        type="button"
                        className="favorites__save"
                        onClick={this.saveFavorites}
                        disabled={
                            !this.state.movies.length || !this.state.title
                        }
                    >
                        {this.state.movies.length && this.state.title
                            ? 'Save Favorites!'
                            : null}
                        {!this.state.movies.length && this.state.title
                            ? 'Nothing to Save :('
                            : null}
                        {!this.state.title && this.state.movies.length
                            ? 'Enter the name of your Favorites List'
                            : null}
                        {!this.state.title && !this.state.movies.length
                            ? 'Save Favorites!'
                            : null}
                    </button>
                )}
            </div>
        );
    }
}

export default Favorites;
