import React from 'react';
import './App.css';
import './scss/mainStyle.scss';

//settings and constructors
import { SETTINGS } from './components/MAIN_SETTINGS.js';
import { ShipClass, Ship} from './components/SHIP_CREATOR.js';

//components
import SoundPlayer from './components/soundPlayer.js';

//setup
import Setup from './components/setup/setup.js';

//grid
import Grid from './components/grid/grid.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerShips: {},
      aiShips: {},
      settings: SETTINGS
    }

  }
  render() {
    console.log(this.state.settings);
  return (
    <div className="App">
      <header className="App-header">
        <Setup ships={this.state.settings.ships} />

      </header>
    </div>
  );
}
}

export default App;
