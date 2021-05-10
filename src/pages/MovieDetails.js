import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      loading: true,
      id: undefined,
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  delete = async (MovieId) => {
    const del = await movieAPI.deleteMovie(MovieId);
    return del;
  }

  fetchMovies = async () => {
    const { match: { params: { id } } } = this.props;
    const movies = await movieAPI.getMovie(id);
    this.setState({
      movies,
      loading: false,
      id,
    });
  }

  render() {
    const { loading } = this.state;
    if (loading === true) {
      return <Loading />;
    }
    const { movies: { title,
      storyline, imagePath, genre, rating, subtitle }, id } = this.state;

    return (
      <div data-testid="movie-details">
        <nav>
          <Link to="/">VOLTAR</Link>
          <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
          <Link to="/" onClick={ () => this.delete(id) }>DELETAR</Link>
        </nav>
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <p>{ `Title: ${title}` }</p>
        <p>{ `Subtitle: ${subtitle}` }</p>
        <p>{ `Storyline: ${storyline}` }</p>
        <p>{ `Genre: ${genre}` }</p>
        <p>{ `Rating: ${rating}` }</p>
      </div>
    );
  }
}
MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
  }).isRequired,
};
export default MovieDetails;
