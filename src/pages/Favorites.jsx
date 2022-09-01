import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    loading: false,
    favoriteSongs: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ loading: false, favoriteSongs });
  }

  render() {
    const { loading, favoriteSongs } = this.state;
    return (
      loading ? <Loading /> : (
        <div data-testid="page-favorites">
          <Header />
          {favoriteSongs.map((music) => (<MusicCard
            favoriteSongs={ favoriteSongs }
            track={ music }
            trackId={ music.trackId }
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
          />))}
        </div>)
    );
  }
}
