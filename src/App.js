import React, { Component } from 'react';
import AlphabetMenu from './AlphabetMenu';
import Songs from './Songs';
import Drawer from './Drawer';

class App extends Component {
  state = {
          activeLetter: "",
          songList: [],
          favorites: {},
          recentlyPlayed: {}
  }
  /*
  favoriteExample = {
    song1 : {
      dateFavorited: "",
      title: "",
    },
    song2 : {
      dateFavorited: "",
      title: "",
    },
  }
  recentlyPlayedExample = {
    song1 : {
      dateFavorited: "",
      title: "",
    },
    song2 : {
      dateFavorited: "",
      title: "",
    },
  }
  */
  selectLetter = (letter) => {
    const activeLetter = letter;

    fetch(`./json/${letter}songs.json`)
      .then((response) => {
        return response.json();
      })
      .then((songListJson) => {
        //console.log(songListJson);
        this.setState({
          activeLetter: activeLetter,
          songList: songListJson
        });
      });

  }

  addToFavorites = (song) => {
    const dateFavorited = Date.now();
    const favorites = {...this.state.favorites};
    //favorites[`song-${Date.now()}`] = song;
    favorites[song] = dateFavorited;
    //favorites[`song`].dateFavorited = dateFavorited;
    //favorites[`song`].title = song;
    this.setState({ favorites });
    console.log(`${Object.keys(favorites).length} added to favorites so far`);
  }

  addToRecentlyPlayed = (song) => {
    const datePlayed = Date.now();
    const recentlyPlayed = {...this.state.recentlyPlayed};
    recentlyPlayed[`song-${Date.now()}`] = song;
    this.setState({ recentlyPlayed });
    console.log(`${Object.keys(recentlyPlayed).length} recently played so far`);
  }

  render = () => {
    return (
      <React.Fragment>
        <div className="container">
          <Header />
          <Drawer favorites={this.state.favorites} />
          <AlphabetMenu selectLetter={this.selectLetter} />
          <Songs songList={this.state.songList}
                 favorites={this.state.favorites}
                 addToFavorites={this.addToFavorites}
                 addToRecentlyPlayed={this.addToRecentlyPlayed}
          />
        </div>
      </React.Fragment>
    )
  }
}

class Header extends Component {
  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <div className="logo"></div>
          <h1 className="App-title">For Promotional Use Only</h1>
          <div className='slogan'>Classic Rave Music from the 90s and Beyond</div>
        </header>
      </div>
    );
  }
}

/*
class Row extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="pink-border col-xs-6 col-sm-3">.col-xs-6 .col-sm-3</div>
          <div className="pink-border col-xs-6 col-sm-3">.col-xs-6 .col-sm-3</div>

          <div className="clearfix visible-xs-block"></div>

          <div className="pink-border col-xs-6 col-sm-3">.col-xs-6 .col-sm-3</div>
          <div className="pink-border col-xs-6 col-sm-3">.col-xs-6 .col-sm-3</div>
        </div>
      </React.Fragment>
    )
  }
}
*/
export default App;
