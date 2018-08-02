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
  state = {
    currentlyPlayingSong: null
  }

  setCurrentlyPlayingSong = index => {
    this.setState({ currentlyPlayingSong: index});
  }

  setNothingPlaying = () => {
    this.setState({ currentlyPlayingSong: null});
  }

  renderSong = (song, index) => {
    return (
      <SingleSong
        songList={this.props.songlist}
        currentlyPlayingSong={this.state.currentlyPlayingSong}
        setNothingPlaying={this.setNothingPlaying}
        setCurrentlyPlayingSong={this.setCurrentlyPlayingSong}
        song={song}
        key={song}
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
    //displaySong : false,
    //playingNow: false
  }

  formatSongTitle = (song) => {
    let array = song.split("");
    array.splice(0,8); // removes "mixtape"
    array.splice(array.length - 4, array.length); // removes ".mp3"
    return array.join("");
  }

  toggleDisplaySong = (currentlyPlayingSong) => {
    const { setNothingPlaying, setCurrentlyPlayingSong, index } = this.props;
    // there's already a song playing
    if (currentlyPlayingSong === index) {
      //this.setState({displaySong: false });
      setNothingPlaying();

    } else { // else, nothing is playing, so show THIS song
      //this.setState({displaySong: true });
      setCurrentlyPlayingSong(index);
    }
  }

  showDisplaySong = () => {
    const {  index, currentlyPlayingSong } = this.props; // `key` is not a prop

    return currentlyPlayingSong === index ? "" : "hideme";
  }

  render = () => {
    const { song, index, key, currentlyPlayingSong } = this.props; // `key` is not a prop
    let songTitle = this.formatSongTitle(song);

    //audio player
    let url = "http://for-promotional-use-only.com/" + song;
    let playlist = [{url: url, title: songTitle}];

    return (
      <li
        className="single-song-wrapper"
        key={songTitle + "-" + index}
        index={key}
        onClick= { ()=> this.toggleDisplaySong(currentlyPlayingSong) }
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
