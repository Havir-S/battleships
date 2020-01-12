import React from 'react';
import GridGame from './gridGame.js';

export default class GameTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    //we create a set of randomly generated ships placed randomly
    // console.log(this.props.shipsForAi);
    let newAiShips = [];

    //making a new array just in case
    let shipsForAi = this.props.shipsForAi.slice();

    //Create as many enemy ships as the player has
    for (let ship of shipsForAi) {
      //Fully random 50/50 direction pick
      let directionFlip = Math.round(Math.random()) === 0 ? 'x' : 'y';
      //Max values of the map
      let {x, y} = this.props.maxValues;
      let randomX = Math.round(Math.random() * x);
      let randomY = Math.round(Math.random() * y);
      //Picking values for the
      ship.blockSet(`${randomX},${randomY}`, directionFlip, shipsForAi, this.props.maxValues,true)
    }
    // this.props.handleAiDeployedShips(newAiShips);
    // console.log(this.props.shipsForAi);
  }


  render() {

    return (
    <>
      <div className="game-div">
        <GridGame currentViewedTab={this.props.currentViewedTab}
                  owner='player'
                  changeCurrentViewedTab={this.props.changeCurrentViewedTab}
                  playerDeployedShips={this.props.playerDeployedShips}
                  maxValues={this.props.maxValues}
                  handleHit={this.props.handleHit}
        />
        <GridGame currentViewedTab={this.props.currentViewedTab}
                  owner='ai'
                  changeCurrentViewedTab={this.props.changeCurrentViewedTab}
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
