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
    const { songList, toggleAddRemoveFavorites, favorites, addToRecentlyPlayed, toggleAddRemoveRecentlyPlayed } = this.props;

    return (
      <SingleSong
        songList={songList}
        favorites={favorites}
        toggleAddRemoveFavorites={toggleAddRemoveFavorites}
        toggleAddRemoveRecentlyPlayed={toggleAddRemoveRecentlyPlayed}
        addToRecentlyPlayed={addToRecentlyPlayed}
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
        <div className="body-content">
          <div className="total-songs">
            {songList.length > 0 ? songList.length + " songs" : null}
          </div>
          <ul className="songlist">
            {songList.map(this.renderSong)}
          </ul>
        </div>
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
  }

  shouldRenderAudioPlayer = () => {
    const { index, currentlyPlayingSong } = this.props;
    return currentlyPlayingSong === index;
  }

  renderFavoritesCSS = (song) => {
    const { favorites } = this.props;
    let favoriteClass;
    // if song is in favorites already
    if (favorites.hasOwnProperty(song)) {
        favoriteClass = "favorite fas fa-star already-favorited";
    } else {
    // if song NOT currently in favorites
        favoriteClass = "favorite far fa-star";
    }
    return ( favoriteClass )
  }
  handlePlay = (song) => {
    const { toggleAddRemoveRecentlyPlayed } = this.props;
    toggleAddRemoveRecentlyPlayed(song);
  }

  handleNextOrPrevious = (direction) => {
    console.log(direction);
  }
  renderAudioPlayer = (playlist,song) =>  {
    const stopChildClickPropagation = this.stopChildClickPropagation;
    const formatSongTitle = this.formatSongTitle;
    const { toggleAddRemoveFavorites, toggleAddRemoveRecentlyPlayed } = this.props;
    const formattedSongTitle = formatSongTitle(song);
    if (this.shouldRenderAudioPlayer()) {
      return (
        <div className="relative">
          <div className="" onClick={ stopChildClickPropagation }>
            <AudioPlayer playlist={playlist}
                         onMediaEvent={{"play": () => this.handlePlay(formattedSongTitle),
                                        //"abort": () => console.log('previous track clicked'),
                                        //"ended": () => console.log('next track clicked')
                                      }}
            />
          </div>
          <div className="clearfix favorite-download" onClick={ stopChildClickPropagation }>
            <i className={ this.renderFavoritesCSS(formattedSongTitle) }
               onClick={ () => toggleAddRemoveFavorites(formattedSongTitle)}></i>
            <i className="download fas fa-download"></i>
          </div>
        </div>
      )
    }
  }

  render = () => {
    const { song, index, currentlyPlayingSong } = this.props; // `key` is not a prop
    let songTitle = this.formatSongTitle(song);

    //audio player
    let url = "http://for-promotional-use-only.com/" + song;
    let playlist = [{url: url, title: songTitle}];

    return (
      <li
        className={"single-song-wrapper " + (this.shouldRenderAudioPlayer() ? "active" : "")}
        key={songTitle + "-" + index}
        index={songTitle + "-" + index}
        onClick= { (e)=> this.toggleDisplaySong(currentlyPlayingSong) }
        //onClick={this.handleParentClick}
        >
        <span className="title">{songTitle}</span>
        { this.renderAudioPlayer(playlist,song)}
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
