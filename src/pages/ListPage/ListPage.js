import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    state = {
        movies: [],
        title: '',
    };
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
            .then((response) => response.json())
            .then((result) => {
                this.setState({ title: result.title, movies: result.movies });
                // console.log(result.movies);
            })
            .catch((error) => console.log(error));
    }
    render() {
        return (
            <>
                <header className="header_listpage">
                    <h1 className="list-page__title">
                        Your Favorites list: {this.state.title}!
                    </h1>
                </header>
                <div className="list-page">
                    <ul>
                        {this.state.movies.map((item) => {
                            return (
                                <li key={item.imdbID}>
                                    <img
                                        className="movie-item__poster"
                                        src={item.Poster}
                                        alt={item.Title}
                                    />
                                    <div>
                                        <h3 className="movie-item__info">
                                            {item.Title} ({item.Year})
                                        </h3>

                                        <button
                                            type="button"
                                            className="IMBD_info"
                                        >
                                            <a
                                                href={`https://www.imdb.com/title/${item.imdbID}/`}
                                                target="_blank"
                                                rel="nofollow noopener noreferrer"
                                            >
                                                Look info on IMDBID
                                            </a>
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </>
        );
    }
}

export default ListPage;
// http://localhost:3000/list/797d4319-70c6-4784-9c59-894b33764499
