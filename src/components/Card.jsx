import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { imageAlbum, collectionName, artistName } = this.props;
    return (
      <section>
        <img src={imageAlbum} alt={collectionName} />
        <h3>{collectionName}</h3>
        <h4>{artistName}</h4>
      </section>
    );
  }
}

Card.propTypes = {
  imageAlbum: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};
