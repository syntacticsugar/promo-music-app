import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <AlphabetMenu />
      </React.Fragment>
    )
  }
}

class AlphabetMenu extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="alphabet-menu-wrapper">A B C D E F G</div>
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
        <Row />
      </div>
    );
  }
}

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
export default App;
