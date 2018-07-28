import React, { Component } from 'react';
import AlphabetMenu from './AlphabetMenu';

class App extends Component {
  state = {
          activeLetter: "",
  }
  selectLetter = (letter) => {
    const activeLetter = letter;
    this.setState({
      activeLetter: activeLetter
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Header />
          <AlphabetMenu selectLetter={this.selectLetter} />
          <h1> {this.state.activeLetter}</h1>
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
