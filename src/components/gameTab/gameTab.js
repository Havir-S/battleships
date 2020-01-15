import React from 'react';
import GridGame from './gridGame.js';
import {CreateShipObjects} from '../SHIP_CREATOR.js';
import HistoryTab from './historyTab.js';
import Navbar from '../navbar.js';
import MiddleBar from '../middleBar.js';
import allyCaptain from '../../blender/allyNormal.png';
import enemyCaptain from '../../blender/enemyNormal.png';
import allyCaptainDefeat from '../../blender/allyScared.png';
import enemyCaptainDefeat from '../../blender/enemyScared.png';

function reload() {
  window.location.reload();
}

export default class GameTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    //here we make a new copy of the player ships and give em to the main App state


    for (let aiShip of this.props.aiShips) {
        //random direction
      let randomDirection,randomCoordX,randomCoordY;
      do {
        randomDirection = Math.round(Math.random()) ? 'x' : 'y';
        randomCoordX = Math.ceil(Math.random() * this.props.maxValues.x);
        randomCoordY = Math.ceil(Math.random() * this.props.maxValues.y);
      } while (aiShip.blockSet(`${randomCoordX},${randomCoordY}`, randomDirection, this.props.aiDeployedShips, this.props.maxValues) === false);

      if(aiShip.blockSet(`${randomCoordX},${randomCoordY}`, randomDirection, this.props.aiDeployedShips, this.props.maxValues)) {
        this.props.handleAiShips(aiShip);
      }


    }

    //AI SHIPS DEPLOYMENT PROCESS STARTS HERE =====================================
    // this.props.handleAiShips(copiedShipsForAi);

  }


  render() {
    return (
    <div className='game-tab'>
      <Navbar />
      <MiddleBar>
      <div className="game-div">
        <div className='player-window'>
          <GridGame owner='player'
                    playerDeployedShips={this.props.playerDeployedShips}
                    maxValues={this.props.maxValues}
                    handleHit={this.props.handleHit}
          />
          <h2>PLAYER</h2>
        </div>
        <div className='ai-window'>
          <GridGame owner='ai'
                    playerDeployedShips={this.props.playerDeployedShips}
                    aiDeployedShips={this.props.aiDeployedShips}
                    maxValues={this.props.maxValues}
                    handleEnemyHit={this.props.handleEnemyHit}
          />
          <h2>ENEMY</h2>
        </div>
        {(() => {
          if (this.props.winner !== '') {
            return (
              <div className='end-tab'>
              <h2>GAME OVER</h2>
              <h3>The winner is {this.props.winner}</h3>
              <button style={{display: 'block'}} onClick={reload}>PLAY AGAIN?</button>
              </div>
            )
          }
        })()}


      </div>
      <div className='game-comment'>
      <div className='player-face'>
        <img className='face' src={this.props.winner === 'PLAYER' ? allyCaptain : this.props.winner === '' ? allyCaptain : allyCaptainDefeat} alt='captain-ally' />
      </div>
      <HistoryTab history={this.props.history} />
       <div className='ai-face'>
       <img className='face' src={this.props.winner === 'ENEMY' ? enemyCaptain : this.props.winner === '' ? enemyCaptain : enemyCaptainDefeat} alt='captain-enemy' />
       </div>
      </div>
      </MiddleBar>
    </div>
  )
  }
}
