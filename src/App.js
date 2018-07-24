import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Barn />
      </div>
    );
  }
}

class Barn extends Component {
  renderLabel(qty,word) {
    return (
      <span>{[...Array(qty).keys()].map( ()=> {
        return word + " ";
      })}</span>
    )
  }
  render() {
    return (
      <div className="barn">
        { this.renderLabel(50, "barn") }
        <Chicken renderLabel={this.renderLabel} />
      </div>
    );
  }
}

class Chicken extends Component {
  render() {
    return (
      <div className="chicken">
        { this.props.renderLabel(50, "chicken") }
        <Egg renderLabel={this.props.renderLabel} />
      </div>
    );
  }
}

class Egg extends Component {
  render() {
    return (
      <div className="egg">
        { this.props.renderLabel(50, "egg") }
        <Chick renderLabel={this.props.renderLabel} />
      </div>
    );
  }
}

class Chick extends Component {
  render() {
    return (
      <div className="chick">
        { this.props.renderLabel(25, "cheep") }
      </div>
    );
  }
}


export default App;
