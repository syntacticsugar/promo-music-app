import React, { Component } from 'react';
import AlphabetMenu from './AlphabetMenu';
import Songs from './Songs';
import Drawer from './Drawer';
import ScrollToTop from 'react-scroll-up';

class App extends Component {
  constructor(props) {
    super(props);

    const defaultState = {
      activeLetter: "K",
      songList: [],
      favorites: {},
      recentlyPlayed: {}
    }

    const savedState = localStorage.getItem('state');

    this.state = savedState ? JSON.parse(savedState) : defaultState;
  }

  componentDidUpdate() {
    localStorage.setItem('state', JSON.stringify(this.state));
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

  toggleAddRemoveFavorites = song => {
    const dateFavorited = Date.now();
    const favorites = {...this.state.favorites};
    // if song already exists, remove it
    if (song in favorites) {
      delete favorites[song]; //google said to use `delete`
    // otherwise, it doesn't exist, ADD it.
    } else {
      favorites[song] = dateFavorited;
    }
    this.setState({ favorites });
  }

  deleteAllFaves = () => {
    console.log("before deleting all faves");
    this.setState( {favorites: {}} );
    console.log("after deleting all faves");
  }

  deleteAllRecents = () => {
    console.log("before deleting recents");
    this.setState( {recentlyPlayed: {}} );
    console.log("after deleting recents");
  }

  toggleAddRemoveRecentlyPlayed = song => {
    const datePlayed = Date.now();
    const recentlyPlayed = {...this.state.recentlyPlayed};
    // if song already exists, remove it
    if (song in recentlyPlayed) {
      delete recentlyPlayed[song]; //google said to use `delete`
    // otherwise, it doesn't exist, ADD it.
    } else {
      recentlyPlayed[song] = datePlayed;
    }
    this.setState({ recentlyPlayed });
  }


  addToRecentlyPlayed = (song) => {
    const datePlayed = Date.now();
    const recentlyPlayed = {...this.state.recentlyPlayed};
    recentlyPlayed[`song-${Date.now()}`] = song;
    this.setState({ recentlyPlayed });
    console.log(`${Object.keys(recentlyPlayed).length} recently played so far`);
  }

  // renders if any there are any favorites, or if any songs have been played
  renderDrawer = () => {
    const { favorites, recentlyPlayed } = this.state;
    const favoritesLength = Object.keys(favorites).length;
    const recentlyPlayedLength = Object.keys(recentlyPlayed).length;
    if (favoritesLength > 0 || recentlyPlayedLength > 0) {
      return (
          <Drawer favorites={this.state.favorites}
                  deleteAllFaves={this.deleteAllFaves}
                  deleteAllRecents={this.deleteAllRecents}
                  recentlyPlayed={this.state.recentlyPlayed}
                  toggleAddRemoveFavorites={this.toggleAddRemoveFavorites}
                  toggleAddRemoveRecentlyPlayed={this.toggleAddRemoveRecentlyPlayed} />
      )
    }

  }

  render = () => {
    return (
      <React.Fragment>
        <div className="container">
          <Header />
          <AlphabetMenu selectLetter={this.selectLetter} activeLetter={this.state.activeLetter}/>
          { this.renderDrawer() }
          <Songs songList={this.state.songList}
                 key={this.state.activeLetter} //  “reset” some state when a prop changes
                 favorites={this.state.favorites}
                 toggleAddRemoveFavorites={this.toggleAddRemoveFavorites}
                 toggleAddRemoveRecentlyPlayed={this.toggleAddRemoveRecentlyPlayed}
          />
        </div>
        <ScrollToTop showUnder={160}>
            <span><i className="scroll-up fa fa-angle-double-up "></i></span>
        </ScrollToTop>
      </React.Fragment>
    )
  }
}

class Header extends Component {
  render = () => {
    return (
      <div className="App clearfix">
        <header className="App-header">
          <div className="logo"></div>
          <h1 className="App-title">For Promotional Use Only</h1>
          <div className='slogan'>Classic Rave Music from the 90s and Beyond</div>
          <div className="social-media">
            <ul>
              <li>
                <a href=""><i className="fab fa-twitter"></i></a>
              </li>
              <li>
                <a href="" ><i className="fab fa-facebook"></i></a>
              </li>
              <li>
                <a href="" ><i className="fas fa-share-square"></i></a>
              </li>
              <li>
                <a href="" ><i className="far fa-envelope"></i></a>
              </li>
            </ul>
          </div>
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
