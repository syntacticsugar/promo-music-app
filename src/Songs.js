import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AudioPlayer from 'react-responsive-audio-player';
// for animations
import Collapse from '@material-ui/core/Collapse';

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

  setNextSong = (index) =>  {
    console.log('next called with', index);
    this.setCurrentlyPlayingSong(index + 1);
  }

  setPreviousSong = (index) =>  {
    console.log('previous called with', index);
    this.setCurrentlyPlayingSong(index - 1);
  }

  renderSong = (song, index) => {
    const { songList, toggleAddRemoveFavorites, favorites, addToRecentlyPlayed, toggleAddRemoveRecentlyPlayed } = this.props;

    return (
      <SingleSong
        songList={songList}
        favorites={favorites}
        toggleAddRemoveFavorites={toggleAddRemoveFavorites}
        toggleAddRemoveRecentlyPlayed={toggleAddRemoveRecentlyPlayed}
        onNext={() => this.setNextSong(index)}
        onPrevious={() => this.setPreviousSong(index)}
        addToRecentlyPlayed={addToRecentlyPlayed}
        currentlyPlayingSong={this.state.currentlyPlayingSong}
        setNothingPlaying={this.setNothingPlaying}
        setCurrentlyPlayingSong={this.setCurrentlyPlayingSong}
        song={song}
        key={song + "-" + index}
        index={index} />
    );
  }
  /* React Documentation:
  If you want to “reset” some state when a prop changes, consider either
  making a component fully controlled or fully uncontrolled with a key instead.
  Hence, I added a key to <Songs key={this.state.activeLetter}  /> in the
  parent level App component.
  */

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
    unfurled: false
  }

  handleUnfurl = () => {
    this.setState(state => ({ unfurled: !state.unfurled }));
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
      setNothingPlaying() ;

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

  playPreviousTrack = () =>  {
    const { onPrevious } = this.props;
    onPrevious();
  }

  playNextTrack = () =>  {
    const { onNext } = this.props;
    onNext();
  }

  getAudioPlayerRef = (ref) =>  {
    if (this.audioPlayerRef) {
      const audioPlayerDOM = ReactDOM.findDOMNode(this.audioPlayerRef);
      const [previousButton, nextButton] = audioPlayerDOM.querySelectorAll('.skip_button');
      previousButton.removeEventListener('click', this.playPreviousTrack);
      nextButton.removeEventListener('click', this.playNextTrack);
    }

    this.audioPlayerRef = ref;

    if (ref) {
      const audioPlayerDOM = ReactDOM.findDOMNode(ref);
      const [previousButton, nextButton] = audioPlayerDOM.querySelectorAll('.skip_button');
      previousButton.addEventListener('click', this.playPreviousTrack);
      nextButton.addEventListener('click', this.playNextTrack);
    }
  }

  renderAudioPlayer = (playlist,song) =>  {

    const stopChildClickPropagation = this.stopChildClickPropagation;
    const formatSongTitle = this.formatSongTitle;
    const { toggleAddRemoveFavorites, toggleAddRemoveRecentlyPlayed } = this.props;
    const formattedSongTitle = formatSongTitle(song);
    const songSrc = playlist[0].url;
    // if (this.shouldRenderAudioPlayer()) {
      return (
        <div className="relative">
          <div className="" onClick={ stopChildClickPropagation }>
            <AudioPlayer autoplay autoplayDelayInSeconds={0.5} ref={this.getAudioPlayerRef} cycle={false} playlist={playlist}
                         onMediaEvent={{"play": () => this.handlePlay(formattedSongTitle)}}
            />
          </div>
          <div className="clearfix favorite-download" onClick={ stopChildClickPropagation }>
            <i className={ this.renderFavoritesCSS(formattedSongTitle) }
               onClick={ () => toggleAddRemoveFavorites(formattedSongTitle)}></i>
            <a href={songSrc}> 
              <i className="download fas fa-download"></i>
            </a>
          </div>
        </div>
      )
    // }
  }

  render = () => {
    const { song, index, currentlyPlayingSong } = this.props; // `key` is not a prop
    const { unfurled } = this.state;
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
          <Collapse in={this.shouldRenderAudioPlayer()} unmountOnExit timeout={{enter:300, exit:500}}>
            { this.renderAudioPlayer(playlist,song)}
          </Collapse>
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
