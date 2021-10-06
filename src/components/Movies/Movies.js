import React, { Component } from 'react';
import store from '../../redux/store';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

class Movies extends Component {
    state = {
        movies: [],
        searchLine: '',
    };

    componentDidMount() {
        store.subscribe(() => {
            const state = store.getState();
            this.setState({
                movies: state.movies,
                searchLine: state.searchLine,
            });
        });
    }

    render() {
        return (
            <>
                {this.state.movies ? (
                    <ul className="movies">
                        {this.state.movies.map((movie) => (
                            <li className="movies__item" key={movie.imdbID}>
                                <MovieItem {...movie} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="movies__error">
                        Your search "{this.state.searchLine}" did not match any
                        movies. Try different keywords.
                    </p>
                )}
            </>
        );
    }
}

export default Movies;
