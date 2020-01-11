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
    console.log(this.props.shipsForAi);
    this.setState({
      hi: 'hoho'
    })
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
