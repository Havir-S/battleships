import React from 'react';
import Navbar from '../navbar.js';
import MiddleBar from '../middleBar.js';

export default class WelcomeTab extends React.Component {

  render() {
    return (
      <div className="welcome-tab">
        <Navbar />
        <MiddleBar>
          <h2>Welcome</h2>
          <h2>to</h2>
          <h2><span className='logo'>BATTLESHIPS</span></h2>
          <p>A classic battleship game with a bit of customization:</p>
          <ul>
            <li>Choose maximum health of ships!</li>
            <li>Choose maximum amount of ships!</li>
            <li>Decide the size of the map!</li>
          </ul>
          <div className='info'>
          <p>Made in REACT</p>
          <p>With GIMP and BLENDER</p>
          </div>
          <button type="button" onClick={() => this.props.changeCurrentViewedTab(this.props.currentViewedTab,'add')}>START</button>
        </MiddleBar>

      </div>
    )
  }
}
