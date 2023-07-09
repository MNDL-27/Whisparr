import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { queueLookupMovie, setImportMovieValue } from 'Store/Actions/importMovieActions';
import createImportMovieItemSelector from 'Store/Selectors/createImportMovieItemSelector';
import ImportMovieSelectMovie from './ImportMovieSelectMovie';

function createMapStateToProps() {
  return createSelector(
    (state) => state.importMovie.isLookingUpMovie,
    createImportMovieItemSelector(),
    (isLookingUpMovie, item) => {
      return {
        isLookingUpMovie,
        ...item
      };
    }
  );
}

const mapDispatchToProps = {
  queueLookupMovie,
  setImportMovieValue
};

class ImportMovieSelectMovieConnector extends Component {

  //
  // Listeners

  onSearchInputChange = (term) => {
    this.props.queueLookupMovie({
      name: this.props.id,
      term,
      topOfQueue: true
    });
  };

  onMovieSelect = (tmdbId) => {
    const {
      id,
      items
    } = this.props;

    const selectedMovie = items.find((item) => item.tmdbId === tmdbId);

    this.props.setImportMovieValue({
      id,
      selectedMovie
    });
  };

  //
  // Render

  render() {
    return (
      <ImportMovieSelectMovie
        {...this.props}
        onSearchInputChange={this.onSearchInputChange}
        onMovieSelect={this.onMovieSelect}
      />
    );
  }
}

ImportMovieSelectMovieConnector.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  selectedMovie: PropTypes.object,
  isSelected: PropTypes.bool,
  onInputChange: PropTypes.func.isRequired,
  queueLookupMovie: PropTypes.func.isRequired,
  setImportMovieValue: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(ImportMovieSelectMovieConnector);
