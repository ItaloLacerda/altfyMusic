import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchEntry: '',
      artistOrMusic: '',
      loadingSearch: false,
      APIreturn: false,
      AlbumsAPI: [],
    };
  }

  handelChange = ({ target }) => {
    const { value } = target;
    this.setState({ searchEntry: value });
  };

  handelClick = async () => {
    const { searchEntry } = this.state;
    const search = searchEntry;
    this.setState({ searchEntry: '', loadingSearch: true });
    const searchAPI = await searchAlbumsAPI(search);
    this.setState({
      APIreturn: true,
      loadingSearch: false,
      artistOrMusic: search,
      AlbumsAPI: searchAPI,
    });
  };

  render() {
    const {
      searchEntry, APIreturn, loadingSearch,
      AlbumsAPI, artistOrMusic,
    } = this.state;
    const minimumCharacters = 2;
    return (
      loadingSearch ? <Loading />
        : (
          <div data-testid="page-search">
            <Header />
            <form>
              <label htmlFor="searchEntry">
                <input
                  data-testid="search-artist-input"
                  id="searchEntry"
                  type="text"
                  onChange={this.handelChange}
                  value={searchEntry}
                />
              </label>
              <button
                type="button"
                disabled={searchEntry.length < minimumCharacters}
                data-testid="search-artist-button"
                onClick={this.handelClick}
              >
                Pesquisar
              </button>
            </form>
            {APIreturn && (
              <section>
                <p>
                  Resultado de álbuns de:
                  {' '}
                  { artistOrMusic }
                </p>
                { AlbumsAPI.length === 0
                  ? <p>Nenhum álbum foi encontrado</p> : AlbumsAPI.map((element) => (
                    <Link
                      to={`/album/${element.collectionId}`}
                      key={element.trackId}
                      data-testid={`link-to-album-${element.collectionId}`}
                    >
                      <Card
                        imageAlbum={element.artworkUrl100}
                        collectionName={element.collectionName}
                        artistName={element.artistName}
                      />
                    </Link>
                  ))}
              </section>
            )}
          </div>
        )
    );
  }
}
