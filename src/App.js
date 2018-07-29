import React, { Component } from 'react';
import AlphabetMenu from './AlphabetMenu';
import Songs from './Songs';

class App extends Component {
  state = {
          activeLetter: "",
          songList: []
  }
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

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Header />
          <AlphabetMenu selectLetter={this.selectLetter} />
          <Songs songList={this.state.songList} />
        </div>
      </React.Fragment>
    )
  }
}

class Header extends Component {
  render() {
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
