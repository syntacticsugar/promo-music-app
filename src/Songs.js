import React, { Component } from 'react';

class Songs extends Component {
  /*  javascript `this` scoping is a f*ing shitshow
  constructor(props) {
    super(props);
    this.formatSongTitle = this.formatSongTitle.bind(this);
    this.renderSong = this.renderSong.bind(this);
  }
  */

  formatSongTitle = (song) => {
    let array = song.split("");
    array.splice(0,8); // removes "mixtape"
    array.splice(array.length - 4, array.length); // removes ".mp3"
    return array.join("");
  }

  renderSong = (song, index) => {
    let songTitle = this.formatSongTitle(song);
    return (
      <li
        className="single-song-wrapper"
        key={'song-' + index} >
        <span className="title">{songTitle}</span>
      </li>
    );
  }

  render = () => {
    const { songList } = this.props;

    return (
      <React.Fragment>
          <ul className="songlist">
            {songList.map(this.renderSong)}
          </ul>
      </React.Fragment>
    )
  }
}

export default Songs;
