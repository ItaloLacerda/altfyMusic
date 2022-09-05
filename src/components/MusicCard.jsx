import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
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

  handelChange = async (obj, func) => {
    const { parentCallback } = this.props;
    const { checked } = this.state;
    this.setState({ loading: true });
    if (checked) {
      await removeSong(obj);
      this.setState({ checked: false });
    } else {
      await addSong(obj);
      this.setState({ checked: true });
    }
    if (parentCallback) func();
    this.setState({ loading: false });
  };

  render() {
    const { loading, checked } = this.state;
    const { trackName, previewUrl, trackId, track, parentCallback } = this.props;
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
              onChange={ () => this.handelChange(track, parentCallback) }
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
  track: PropTypes.shape.isRequired,
  parentCallback: PropTypes.shape.isRequired,
  favoriteSongs: PropTypes.arrayOf.isRequired,
};
