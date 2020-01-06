import React from 'react';
import './App.css';
import './scss/mainStyle.scss';

//settings and constructors
import { SETTINGS, STATICVALUES } from './components/MAIN_SETTINGS.js';
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
      ships: SETTINGS.ships,
      field: SETTINGS.field,
      startValues: SETTINGS.startValues
    }
    this.shipChange = this.shipChange.bind(this);
    this.gridChangeSize = this.gridChangeSize.bind(this);
    this.gridChangeSizeInput = this.gridChangeSizeInput.bind(this);
  }

  shipChange(action, data, ship) {
    let newShips = this.state.ships;
    //adding value
    if (action === 'add') {
      //checking if value is not over 10
      if (this.state.ships[ship][data]) {
      }
    newShips[ship][data] += 1;
  }
  //subtracting value
  else if (action === 'subtract') {
    if ((data === 'amount' && this.state.ships[ship][data] === 0) || (data === 'health' && this.state.ships[ship][data] === 1)) {
      console.log('no change');
      return;
    }
    newShips[ship][data] -= 1;
  }
    this.setState({ships: newShips});
  }

  //change grid sizes with buttons
  gridChangeSize(option,action) {
    if (option > 1 && action === 'subtract') {
      return;
    } else if ( action === 'add' && this.state.field[option] < 15) {
      let newField = this.state.field;
      newField[option] += 1
      this.setState({field: newField});
    } else if ( action === 'subtract' && this.state.field[option] > 1) {
      let newField = this.state.field;
      newField[option] -= 1;
      this.setState({field: newField});
    }
  }

  //change grid sizes by typing
  gridChangeSizeInput(value,coordinate) {
    //only digits
    if(/\D/.test(value.target.value) || value.target.value > 25) {
      return;
    }
    let newField = this.state.field;
    newField[coordinate] = value.target.value;
    this.setState({ field: newField});
  }



  render() {
  return (
    <div className="App">
      <header className="App-header">
        <Setup ships={this.state.ships}
               shipChange={this.shipChange}
               hasAdvancedSettings={this.state.advancedSettings}
               advancedSettingsToggle={this.advancedSettingsToggle}
               gridChangeSize={this.gridChangeSize}
               field={this.state.field}
               startValues={this.state.startValues}
               gridChangeSizeInput={this.gridChangeSizeInput}

        />

      </header>
    </div>
  );
}
}

export default App;
