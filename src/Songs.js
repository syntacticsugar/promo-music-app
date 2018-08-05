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
        index={song + "-" + index} /> // has to be unique
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

  /*
  showOrHide = () => {
    const {  index, currentlyPlayingSong } = this.props; // `key` is not a prop
    return currentlyPlayingSong === index ? "" : "hideme";
  }
  */

  handleParentClick = () => {
    console.log('handleParentClick');
  }

  stopChildClickPropagation = (e) => {
    e.stopPropagation();

    console.log('handleChildClick');
  }

  shouldRenderAudioPlayer = () => {
    const {  index, currentlyPlayingSong } = this.props; // `key` is not a prop
    return currentlyPlayingSong === index;
  }

  renderAudioPlayer = (playlist) =>  {
    if (this.shouldRenderAudioPlayer()) {
      return (
      <div onClick={ this.stopChildClickPropagation }>
        <AudioPlayer playlist={playlist} />
      </div>
      )
    }
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
        index={songTitle + "-" + index}
        onClick= { (e)=> this.toggleDisplaySong(currentlyPlayingSong) }
        //onClick={this.handleParentClick}
        >
        <span className="title">{songTitle}</span>
        { this.renderAudioPlayer(playlist)}
        {/*
        <div
          className={ this.showOrHide() }
          //className=""
          onClick={ this.handleChildClick }>
          <AudioPlayer playlist={playlist} />
        </div>
        */}
      </li>
    )
  }

}

export default Songs;
