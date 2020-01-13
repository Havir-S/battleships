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
import GameTab from './components/gameTab/gameTab.js';

let tabsInOrder = [ 'gridTab','gameTab','welcomeTab', 'shipsSettingsTab', 'sizeSettingsTab'];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerShips: [],
      playerDeployedShips: [],
      aiShips: [],
      aiDeployedShips: [],
      ships: SETTINGS.ships,
      field: SETTINGS.field,
      startValues: SETTINGS.startValues,
      currentViewedTab: tabsInOrder[0],
      actionsHistory: [],
      turn: 'player',
      alreadyShotByAi: [],
      allShipsHp: 0,
      gameEnded: false,
    }
    this.shipChange = this.shipChange.bind(this);
    this.gridChangeSize = this.gridChangeSize.bind(this);
    this.gridChangeSizeInput = this.gridChangeSizeInput.bind(this);
    this.changeCurrentViewedTab = this.changeCurrentViewedTab.bind(this);
    this.changeStartValues = this.changeStartValues.bind(this);
    this.changePlayerShips = this.changePlayerShips.bind(this);
    this.handlePlayerDeployedShips = this.handlePlayerDeployedShips.bind(this);
    this.handleHit = this.handleHit.bind(this);
    this.checkWinner = this.checkWinner.bind(this);
    this.handleEnemyHit = this.handleEnemyHit.bind(this);
    this.handleAiDeployedShips = this.handleAiDeployedShips.bind(this);
    this.handleAiShips = this.handleAiShips.bind(this);
  }

  componentDidMount() {
    this.setState({
      playerShips: CreateShipObjects(SETTINGS.ships),
      aiShips: CreateShipObjects(SETTINGS.ships)
    })
  }

  //CHANGING THE DATA OF ALL THE SHIPS in this method ===================================
  shipChange(action, data, ship) {
    let newShips = this.state.ships;
    //adding value
    if (action === 'add') {
      //checking if value is not over 10 //FIXME if needed
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
    this.setState({
      ships: newShips

    });

    this.setState({
      playerShips: CreateShipObjects(newShips),
      aiShips: CreateShipObjects(newShips)
    });
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
  handlePlayerDeployedShips(x, action) {
    if (action === 'add') {
    let newArr = this.state.playerDeployedShips;
    newArr.push(x);
    this.setState({
      playerDeployedShips: newArr
    })
  } else if (action === 'remove') {
    //we make sure the ship shows up in the hangar again
    x.deployed = false;
    x.blocks = [];
    //we delete it from the deployed ships array
    let newArr = this.state.playerDeployedShips;
    newArr.splice(newArr.indexOf(x),1);
    this.setState({
      playerDeployedShips: newArr
    });
  }
}

  //SPAWNING SHIPS FOR AI
  handleAiShips(aiShipToDeploy) {
    let newArr = this.state.aiDeployedShips;
    aiShipToDeploy.deployed = true;
    newArr.push(aiShipToDeploy);
    this.setState({
      aiDeployedShips: newArr
    });
    // this.setState({
    // aiShips: aiShipsArr
    // })
  }

  //DEPLOYING SHIPS FOR AI
  handleAiDeployedShips(x, action) {
    let newArr = this.state.aiDeployedShips;
    newArr.push(x);
    this.setState({
      aiDeployedShips: newArr
    })

  }



// PLAYER SHIP HIT LOGIC HERE =====================================================================
handleHit(ship,hpBlock) {
  if(!hpBlock.isHit) {
    let newArr = this.state.playerDeployedShips;
    hpBlock.isHit = true;

    this.setState({
      playerDeployedShips: newArr
    });
}
  // newArr.indexOf(ship)
}

// AI SHIP HIT LOGIC HERE ==========================================================================
handleEnemyHit(x,y,ship) {
  //if we hit a ship we get another shot
  if (ship) {
    console.log(x,y);
    console.log(ship);
    //find the hpBlock that's got hit
    let blockThatGotHit = ship.blocks.filter(block => {
      return (block.x === x && block.y === y );
    })[0];

    //we make sure it has a hit mark
    blockThatGotHit.isHit = true;

    //check if the ship has not sunk
    if (ship.blocks.every((x) => x.isHit === true )) {
      console.log('the ship has sunk');
      this.checkWinner();
    }

    //save the outcome
    let newHistory = this.state.actionsHistory;
    newHistory.push(`Player shoots and hits at ${x},${y}!`);
    this.setState({
      turn: 'player',
      actionsHistory: newHistory
    })



  } else {
    let newHistory = this.state.actionsHistory;
    newHistory.push(`Player misses at ${x},${y}!`);

    this.setState({
      turn: 'ai',
      actionsHistory: newHistory
    })
  }
}


// CHECK IF ALL SHIPS HAVE SUNK
checkWinner() {
  //check player ships
  console.log(this.state.playerDeployedShips);
  //check if all player blocks have been hit
  let allBlocksPlayer = this.state.playerDeployedShips.filter((el) => {
    return el.blocks.every((el) => el.isHit === true);
  });
  console.log(allBlocksPlayer);
  if (allBlocksPlayer.length === this.state.playerDeployedShips.length) {
    console.log('all of player ships are hit, ai wins');
    this.setState({
      gameEnded: true
    })
    return;
  }

  //check ai ships
  let allBlocksAi = this.state.aiDeployedShips.filter((el) => {
    return el.blocks.every((el) => el.isHit === true);
  });
  console.log(allBlocksAi);

  if (allBlocksAi.length === this.state.aiDeployedShips.length) {
    console.log('player won');
    this.setState({
      gameEnded: true
    })
    return;
  }
}

componentDidUpdate() {
    //this is where the AI TURN HAPPENS
    if (this.state.turn === 'ai') {
      console.log('turn has been changed to ai, now we can pick coords and shoot the player');
      let randomX, randomY;

      //make sure we don't end up in a loop
      if (this.state.alreadyShotByAi.length === (this.state.field.x * this.state.field.y)) {
        console.log('reached max guesses');
        return;
      }

      do {
        randomX = Math.ceil(Math.random() * this.state.field.x );
        randomY = Math.ceil(Math.random() * this.state.field.y );
      } while (this.state.alreadyShotByAi.filter(el => (el[0] === randomX && el[1] === randomY)).length)


      let newArr;
      //check if hit any ships
      for (let playerShip of this.state.playerDeployedShips) {
        let hitGrid = playerShip.blocks.filter(hpBar => (hpBar.x === randomX && hpBar.y === randomY))[0];
        //if we found it
        if (hitGrid) {
          hitGrid.isHit = true;

          //WE MAKE SURE THOSE COORDS WONT BE HIT IN THE FUTURE SO WE SAVE THEM
          newArr = this.state.alreadyShotByAi;
          newArr.push( [randomX, randomY] );

          //ALSO MAKINGA COMMENT ABOUT THE ACTIONS
          let newHistory = this.state.actionsHistory;
          newHistory.push(`Ai shoots and hits at ${randomX},${randomY}!`);

          this.checkWinner();
          //they hit, so now they can take another shot
          this.setState({
            turn: 'ai',
            alreadyShotByAi: newArr,
            actionsHistory: newHistory
          })
          return;
        }
      }

      //WE MAKE SURE THOSE COORDS WONT BE HIT IN THE FUTURE SO WE SAVE THEM
      newArr = this.state.alreadyShotByAi;
      newArr.push( [randomX, randomY] );

      //ALSO MAKINGA COMMENT ABOUT THE ACTIONS
      let newHistory = this.state.actionsHistory;
      newHistory.push(`Ai MISSES at ${randomX},${randomY}!`);

      // console.log(`AI MISSED with coords ${randomX},${randomY}`);
      this.setState({
        turn: 'player',
        alreadyShotByAi: newArr,
        actionsHistory: newHistory
      })

    }
}



  render() {
    console.log(this.state.actionsHistory);
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
      case 'gridTab':
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
      case 'gameTab':
      currentTab = (
        <GameTab currentViewedTab={this.state.currentViewedTab}
                 changeCurrentViewedTab={this.changeCurrentViewedTab}
                 playerDeployedShips={this.state.playerDeployedShips}

                 handleAiDeployedShips={this.handleAiDeployedShips}
                 handleAiShips={this.handleAiShips}
                 aiShips={this.state.aiShips}
                 aiDeployedShips={this.state.aiDeployedShips}

                 maxValues={this.state.field}
                 startValues={this.state.startValues}
                 staticValues={STATICVALUES}


                 handleHit={this.handleHit}
                 handleEnemyHit={this.handleEnemyHit}
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
