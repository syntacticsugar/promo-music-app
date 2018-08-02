import React, { Component } from 'react';
import AudioPlayer from 'react-responsive-audio-player';

class Songs extends Component {
  /*  javascript `this` scoping is a f*ing shitshow
  constructor(props) {
    super(props);
    this.formatSongTitle = this.formatSongTitle.bind(this);
    this.renderSong = this.renderSong.bind(this);
  }
  */

  renderSong = (song, index) => {
    return (
      <SingleSong
        songList={this.props.songlist}
        song={song}
        key={"song " + index}
        index={index} />
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


class SingleSong extends Component {
  state = {
    displaySong : false,
  }

  formatSongTitle = (song) => {
    let array = song.split("");
    array.splice(0,8); // removes "mixtape"
    array.splice(array.length - 4, array.length); // removes ".mp3"
    return array.join("");
  }

  toggleDisplaySong = () => {
    const displaySong = this.state.displaySong;
    this.setState({displaySong: !displaySong });
  }

  showDisplaySong = () => {
    return this.state.displaySong ? "showme" : "hideme";
  }

  render = () => {
    const { song, index } = this.props;
    let songTitle = this.formatSongTitle(song);

    //audio player
    let url = "http://for-promotional-use-only.com/" + song;
    let playlist = [{url: url, title: songTitle}];

    return (
      <li
        className="single-song-wrapper"
        key={'song-' + index}
        index={index}
        onClick= { ()=> this.toggleDisplaySong() }
        >
        <span className="title">{songTitle}</span>
        <div className={ this.showDisplaySong() }>
          <AudioPlayer playlist={playlist} />
        </div>
      </li>
    )
  }

}

export default Songs;
