import React from 'react';
import GridGame from './gridGame.js';
import {CreateShipObjects} from '../SHIP_CREATOR.js';

export default class GameTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    //here we make a new copy of the player ships and give em to the main App state



    for (let ship of this.props.playerDeployedShips) {
      console.log(ship);
    }

//     do {
//      i = i + 1;
//      result = result + i;
//    } while (i < 5);
// for (let aiShip of this.props.aiShips) {
//     //random direction
//   let randomDirection,
//   let randomDirection = Math.round(Math.random()) ? 'x' : 'y';
//
//     //random coords
//   let randomCoordX = Math.ceil(Math.random() * this.props.maxValues.x);
//   let randomCoordY = Math.ceil(Math.random() * this.props.maxValues.y);
//
//   do {
//
//   } while
//
//   if(aiShip.blockSet(`${randomCoordX},${randomCoordY}`, randomDirection, this.props.aiDeployedShips, this.props.maxValues)) {
//     console.log('ding');
//     this.props.handleAiShips(aiShip);
//   }
//
//
// }


    console.log('ai ships start here');

    for (let aiShip of this.props.aiShips) {
        //random direction
      let randomDirection,randomCoordX,randomCoordY;
      do {
        randomDirection = Math.round(Math.random()) ? 'x' : 'y';
        randomCoordX = Math.ceil(Math.random() * this.props.maxValues.x);
        randomCoordY = Math.ceil(Math.random() * this.props.maxValues.y);
      } while (aiShip.blockSet(`${randomCoordX},${randomCoordY}`, randomDirection, this.props.aiDeployedShips, this.props.maxValues) === false);

      if(aiShip.blockSet(`${randomCoordX},${randomCoordY}`, randomDirection, this.props.aiDeployedShips, this.props.maxValues)) {
        console.log('ding');
        this.props.handleAiShips(aiShip);
      }


    }

    //AI SHIPS DEPLOYMENT PROCESS STARTS HERE =====================================
    // this.props.handleAiShips(copiedShipsForAi);

  }


  render() {
    console.log(this.props.aiDeployedShips);
    return (
    <>
      <div className="game-div">
        <GridGame owner='player'
                  playerDeployedShips={this.props.playerDeployedShips}
                  maxValues={this.props.maxValues}
                  handleHit={this.props.handleHit}
        />
        <GridGame owner='ai'
                  playerDeployedShips={this.props.playerDeployedShips}
                  aiDeployedShips={this.props.aiDeployedShips}
                  maxValues={this.props.maxValues}
                  handleEnemyHit={this.props.handleEnemyHit}
        />

      </div>
       <button onClick={() => this.props.changeCurrentViewedTab(this.props.currentViewedTab,'add')}
               type="button">
               Go forward
       </button>
       <button onClick={() => this.props.changeCurrentViewedTab(this.props.currentViewedTab,'subtract')}
               type="button">
               Go back
       </button>
    </>
  )
  }
}
