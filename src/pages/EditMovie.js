import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Loading, MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      movie: [],
      shouldRedirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchMovies();
  }

  handleSubmit(updatedMovie) {
    const { updateMovie } = movieAPI;
    updateMovie(updatedMovie).then(() => {
      this.setState({
        shouldRedirect: true,
      });
    });
  }

  fetchMovies = async () => {
    const { match: { params: { id } } } = this.props;

    const movie = await movieAPI.getMovie(id);
    this.setState({
      status: 'loadingIsNot',
      movie,
    });
  }

  render() {
    const { status, shouldRedirect, movie } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/" />;
    }

    if (status === 'loading') {
      return <Loading />;
    }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

export default EditMovie;
