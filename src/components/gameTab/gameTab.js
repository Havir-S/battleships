import React from 'react';
import GridGame from './gridGame.js';

export default class GameTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {


  }


  render() {

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
