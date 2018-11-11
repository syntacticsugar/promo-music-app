import React, { Component } from 'react';

const alphabetConst = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

class AlphabetMenu extends Component {
  activeLetterClass = letter => {
    const activeLetter = this.props.activeLetter;
    let activeLetterClass = "";
    if (activeLetter === letter) { // activeLetter matches letter
        activeLetterClass="active-letter";
    }
    return activeLetterClass;
  }
  createLetter = (letter) => {
    //console.log(`trying to create letter "${letter}"`);
    const selectLetter = this.props.selectLetter;
    return (
      <li
        key={letter}
        onClick={ ()=>selectLetter(letter)}
        className={this.activeLetterClass(letter)}
        >{letter}</li>
    )
  }
  render = () => {
    const {activeLetter, selectLetter} = this.props
    return (
      <React.Fragment>
        <div className="header-wrapper">
          <div className="horizontal-line"></div>
          <div className="alphabet-menu-wrapper">
              <div className="horizontal-line"></div>
              <div className="horizontal-line"></div>

              <div className="horizontal-scroller">
                <ul>
                  <li
                    key={"NUM"}
                    onClick={ ()=>selectLetter("NUM")}
                    className={this.activeLetterClass("NUM")}
                    >#</li>

                  { alphabetConst.map((letter) => this.createLetter(letter) ) }
                </ul>
              </div>

              <div className="horizontal-line margin-top-zero"></div>
              <div className="horizontal-line"></div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default AlphabetMenu;
