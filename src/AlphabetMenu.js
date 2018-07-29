import React, { Component } from 'react';

const alphabetConst = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

class AlphabetMenu extends Component {
  createLetter = (letter) => {
    //console.log(`trying to create letter "${letter}"`);
    const selectLetter = this.props.selectLetter;
    return (
      <li key={letter} onClick={ ()=>selectLetter(letter)}>{letter}</li>
    )
  }
  /*

  */
  render = () => {
    return (
      <React.Fragment>
        <div className="horizontal-line"></div>
        <div className="alphabet-menu-wrapper">
            <div className="horizontal-line"></div>
            <div className="horizontal-line"></div>

            <div className="horizontal-scroller">
              <ul>
                { alphabetConst.map((letter) => this.createLetter(letter) ) }
              </ul>
            </div>

            <div className="horizontal-line"></div>
            <div className="horizontal-line"></div>
        </div>
      </React.Fragment>
    )
  }
}

export default AlphabetMenu;
