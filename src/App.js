import React from 'react';
import './App.css';
import './scss/mainStyle.scss';

//settings and constructors
import { SETTINGS, STATICVALUES } from './components/MAIN_SETTINGS.js';
import { CreateShipObjects } from './components/SHIP_CREATOR.js';

//components


//setup
import Setup from './components/setup/setup.js';
import WelcomeTab from './components/setup/WelcomeTab.js'
import Grid from './components/grid/grid.js';

let tabsInOrder = [ 'gameTab','welcomeTab', 'shipsSettingsTab', 'sizeSettingsTab',];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerShips: [],
      playerDeployedShips: [],
      aiShips: [],
      ships: SETTINGS.ships,
      field: SETTINGS.field,
      startValues: SETTINGS.startValues,
      currentViewedTab: tabsInOrder[0],
      actionsHistory: []
    }
    this.shipChange = this.shipChange.bind(this);
    this.gridChangeSize = this.gridChangeSize.bind(this);
    this.gridChangeSizeInput = this.gridChangeSizeInput.bind(this);
    this.changeCurrentViewedTab = this.changeCurrentViewedTab.bind(this);
    this.changeStartValues = this.changeStartValues.bind(this);
    this.changePlayerShips = this.changePlayerShips.bind(this);
    this.handlePlayerDeployedShips = this.handlePlayerDeployedShips.bind(this);
  }

  componentDidMount() {
    this.setState({
      playerShips: CreateShipObjects(SETTINGS.ships),
      // aiShips: CreateShipObjects(SETTINGS.ships)
    })
  }

  //CHANGING THE DATA OF ALL THE SHIPS in this method ===================================
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
    //HERE WE ALSO CHANGE THE PLAYERSHIPS AND AISHIPS as the options continue to change

    this.setState({playerShips: CreateShipObjects(newShips)});
  }

  //change grid sizes with buttons  =================================== ===================================
  gridChangeSize(option,action) {
    if (option > 1 && action === 'subtract') {
      return;
    } else if ( action === 'add' && this.state.field[option] < 26) {
      let newField = this.state.field;
      newField[option] += 1
      this.setState({field: newField});
    } else if ( action === 'subtract' && this.state.field[option] > 1) {
      let newField = this.state.field;
      newField[option] -= 1;
      this.setState({field: newField});
    }
  }

  //change grid sizes by typing  =================================== ===================================
  gridChangeSizeInput(value,coordinate) {
    //only digits
    if(/\D/.test(value.target.value) || value.target.value > 25) {
      return;
    }
    let newField = this.state.field;
    newField[coordinate] = value.target.value;
    this.setState({ field: newField});
  }

  changeCurrentViewedTab(x, action) {
    let newCurrentViewedTab;
    if (action === 'add') {
      newCurrentViewedTab = tabsInOrder[tabsInOrder.indexOf(x) + 1];
    } else if (action === 'subtract') {
      newCurrentViewedTab = tabsInOrder[tabsInOrder.indexOf(x) - 1];
    }

    this.setState({currentViewedTab: newCurrentViewedTab});
  }

  //changing the A-H values and 1-10 to whatever the user chooses =================================== ===================================
  changeStartValues(e) {
    let newStartValues = this.state.startValues;
    newStartValues[e.target.name] = e.target.value;

    this.setState({startValues: newStartValues});
  }

  changePlayerShips(x) {
    console.log(x);
  }

  // SPAWNING SHIPS START HERE ===============================================================
  //this is the function that stores all the ships that user puts on the starting grid
  handlePlayerDeployedShips(x) {
    // console.log(x);
    // console.log(this.state.playerDeployedShips);
    let newArr = this.state.playerDeployedShips;
    newArr.push(x);
    this.setState({
      playerDeployedShips: newArr
    })
  }

  render() {
    let currentTab;
    switch (this.state.currentViewedTab) {
      case 'welcomeTab':
        currentTab = (
            <WelcomeTab currentViewedTab={this.state.currentViewedTab}
                        changeCurrentViewedTab={this.changeCurrentViewedTab}
             />
        );
      break;
      case 'sizeSettingsTab':
        currentTab = (
          <Setup ships={this.state.ships}
                 shipChange={this.shipChange}

                 currentViewedTab={this.props.currentViewedTab}
                 changeCurrentViewedTab={this.changeCurrentViewedTab}

                 hasAdvancedSettings={this.state.advancedSettings}
                 advancedSettingsToggle={this.advancedSettingsToggle}

                 gridChangeSize={this.gridChangeSize}
                 gridChangeSizeInput={this.gridChangeSizeInput}

                 field={this.state.field}
                 startValues={this.state.startValues}
                 staticValues={STATICVALUES}
                 changeStartValues={this.changeStartValues}

                 currentViewedTab={this.state.currentViewedTab}
                 changeCurrentViewedTab={this.changeCurrentViewedTab}

                 changePlayerShips={this.changePlayerShips}

          />
        );
      break;
      case 'shipsSettingsTab':
        currentTab = (
          <Setup ships={this.state.ships}
                 shipChange={this.shipChange}

                 currentViewedTab={this.props.currentViewedTab}
                 changeCurrentViewedTab={this.changeCurrentViewedTab}

                 hasAdvancedSettings={this.state.advancedSettings}
                 advancedSettingsToggle={this.advancedSettingsToggle}

                 gridChangeSize={this.gridChangeSize}
                 gridChangeSizeInput={this.gridChangeSizeInput}

                 field={this.state.field}
                 startValues={this.state.startValues}
                 staticValues={STATICVALUES}
                 changeStartValues={this.changeStartValues}

                 currentViewedTab={this.state.currentViewedTab}
                 changeCurrentViewedTab={this.changeCurrentViewedTab}

                 changePlayerShips={this.changePlayerShips}

          />
        );
      break;
      case 'gameTab':
        currentTab = (
            <Grid maxValues={this.state.field}
                  startValues={this.state.startValues}
                  staticValues={STATICVALUES}

                  currentViewedTab={this.state.currentViewedTab}
                  changeCurrentViewedTab={this.changeCurrentViewedTab}

                  test={this.state}
                  playerShips={this.state.playerShips}

                  playerDeployedShips={this.state.playerDeployedShips}
                  handlePlayerDeployedShips={this.handlePlayerDeployedShips}

             />
        );
      break;
      default:
      break;
    }



  return (
    <div className="App">
     <header className="App-header">
      {currentTab}
     </header>
    </div>
  );
}
}

export default App;
