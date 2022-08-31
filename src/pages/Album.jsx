import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

export default class Album extends Component {
  state = {
    loading: false,
    musicAlbum: [],
    artistName: '',
    favoriteSongs: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const { match: { params: { id } } } = this.props;
    const MUSICALBUM = await getMusics(id);

    this.setState({
      musicAlbum: MUSICALBUM.filter((_track, index) => index > 0),
      artistName: MUSICALBUM[0] });

    const FAVORITESONGS = await getFavoriteSongs();

    this.setState({ loading: false, favoriteSongs: FAVORITESONGS });
  }

  render() {
    const { musicAlbum, artistName, loading, favoriteSongs } = this.state;
    return (
      loading ? <Loading /> : (
        <div data-testid="page-album">
          <Header />
          <h2 data-testid="album-name">{artistName.collectionName}</h2>
          <h3 data-testid="artist-name">{artistName.artistName}</h3>
          {musicAlbum.map((track) => (
            <MusicCard
              favoriteSongs={ favoriteSongs }
              track={ track }
              trackId={ track.trackId }
              key={ track.trackId }
              trackName={ track.trackName }
              previewUrl={ track.previewUrl }
            />))}
        </div>)
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
