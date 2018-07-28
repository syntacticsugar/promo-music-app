import React, { Component } from 'react';

const alphabetConst = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

class AlphabetMenu extends Component {
  constructor(props, context) {
    super(props, context);
    this.alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
  }

  render() {
    return (
      <React.Fragment>
        <div className="alphabet-menu-wrapper">
            <ul>
              <li>A</li>
              <li>B</li>
              <li>C</li>
              <li>D</li>
              <li>E</li>
              <li>F</li>
              <li>G</li>
            </ul>
        </div>
      </React.Fragment>
    )
  }
}

export default AlphabetMenu;
