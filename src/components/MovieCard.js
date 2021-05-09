import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    const { imagePath, storyline, title, id } = movie;
    return (
      <div data-testid="movie-card">

        <img src={ imagePath } alt={ title } />
        <h1>{title}</h1>
        <p>{storyline}</p>
        <Link to={ `/movies/${id}` }>VER DETALHES</Link>

      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    imagePath: PropTypes.string,
    storyline: PropTypes.string,
    title: PropTypes.string,
  }),
}.isRequired;

export default MovieCard;
