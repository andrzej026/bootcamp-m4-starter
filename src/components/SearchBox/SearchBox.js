import React, { Component } from 'react';
import store from '../../redux/store';
import './SearchBox.css';

class SearchBox extends Component {
    state = {
        searchLine: '',
    };
    searchLineChangeHandler = (searchValue) => {
        this.setState({ searchLine: searchValue.target.value });
        setTimeout(() => {
            store.dispatch({
                type: 'CHANGE_SEACHLINE',
                payload: {
                    searchValue: this.state.searchLine,
                },
            });
        }, 900);
    };
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        setTimeout(() => {
            fetch(
                `http://www.omdbapi.com/?s=${this.state.searchLine.trim()}&apikey=dc1397c9`
            )
                .then((response) => response.json())
                .then((movies) => {
                    const searchingMovies = movies.Search;
                    store.dispatch({
                        type: 'SEARCHING_MOVIES',
                        payload: {
                            searchingMovies: searchingMovies,
                        },
                    });
                })
                .catch((error) => console.log(error));
        }, 900);
    };

    render() {
        const { searchLine } = this.state;

        return (
            <div className="search-box">
                <form
                    className="search-box__form"
                    onSubmit={this.searchBoxSubmitHandler}
                >
                    <label className="search-box__form-label">
                        What do you want to see?
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Maybe, Shawshank Redemption?"
                            onInput={this.searchLineChangeHandler} //onInput??
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                    >
                        Search
                    </button>
                </form>
            </div>
        );
    }
}

export default SearchBox;
