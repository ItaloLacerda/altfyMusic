import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {

    loading: false,
    checked: false,
  };

  componentDidMount() {
    const { favoriteSongs, trackId } = this.props;
    const FAVORITESONGS = favoriteSongs.some((track) => track.trackId === trackId);
    this.setState({ checked: FAVORITESONGS });
  }

  handelClick = async (obj) => {
    this.setState({ loading: true });
    await addSong(obj);
    this.setState({ loading: false, checked: true });
  };

  render() {
    const { loading, checked } = this.state;
    const { trackName, previewUrl, trackId, track } = this.props;
    return (
      loading ? <Loading /> : (
        <div>
          <h4>{trackName}</h4>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
          </audio>
          <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
            <span>Favorita</span>
            <input
              type="checkbox"
              id={ trackId }
              onClick={ () => this.handelClick(track) }
              checked={ checked }
            />
          </label>
        </div>)
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  track: PropTypes.objectOf().isRequired,
  favoriteSongs: PropTypes.arrayOf.isRequired,
};
