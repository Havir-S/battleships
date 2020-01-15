import React from 'react';
import {
  GridElementGame,
  GridGameShipElement,
  GridGameEnemyShipElement,
  GridGameEnemyElement
} from './gridElementGame.js';
import GridSide from '../grid/gridSide.js';

export default class GridGame extends React.Component {
constructor(props) {
  super(props);
}

  render() {
    // ================================================================
    // PLAYER OR AI
    // ================================================================

    //Deciding who's grid is it
    //Player === visible ships and no click event
    //Ai === no visible ships and click events
    let gridPlayerClass;
    let squares = [];


    if (this.props.owner === 'player') {
      gridPlayerClass = 'player';

      // ================================================================
      // Squares PLAYER
      // ================================================================
      let {x, y} = this.props.maxValues;

      for (let i = 1; i <= x; i++) {
        //y coordinate FOR
        for (let j = 1; j <= y; j++) {
            squares.push(<GridElementGame coordX={j}
                                          coordY={i}
                                          key={`${j},${i}`}
                                          />)
        }
      }

      //check for all the squares
      for (var k = 0; k < squares.length; k++) {
        let [ squareCoordX, squareCoordY ] = squares[k].key.split(",");
      //we check all the ships
      for (let ship of this.props.playerDeployedShips) {
        // check all the hpblocks
        for (let hpBlock of ship.blocks) {
          let {x, y} = hpBlock;
          if (x === Number(squareCoordX) && y === Number(squareCoordY)) {
            let shipHpBar = <GridGameShipElement key={`${x},${y}`}
                                                 coordX={x}
                                                 coordY={y}
                                                 currentHpBlock={hpBlock}
                                                 handleHit={this.props.handleHit}
                                                 ship={ship}
            />;

            squares.splice(squares.indexOf(squares[k]),1,shipHpBar);
          }
        }
      }
    }
    } else if (this.props.owner === 'ai') {

      // ================================================================
      // Squares AI
      // ================================================================
      let {x, y} = this.props.maxValues;

      for (let i = 1; i <= x; i++) {
        //y coordinate FOR
        for (let j = 1; j <= y; j++) {
            squares.push(<GridGameEnemyElement coordX={j}
                                          coordY={i}
                                          key={`${j},${i}`}
                                          handleEnemyHit={this.props.handleEnemyHit}
                                          />)
        }
      }

      for (var k = 0; k < squares.length; k++) {
        let [ squareCoordX, squareCoordY ] = squares[k].key.split(",");

        //check all the ai deployed ships
        for (let aiDeployedShip of this.props.aiDeployedShips) {

          for (let hpBar of aiDeployedShip.blocks) {
            let {x, y} = hpBar;
            if (x === Number(squareCoordX) && y === Number(squareCoordY)) {
              let aiShipHpBar;
              //IF THE BLOCK GOT HIT IN THE PAST =================================
              if (hpBar.isHit) {
                aiShipHpBar = <GridGameEnemyShipElement key={`${x},${y}`}
                                                            coordX={x}
                                                            coordY={y}
                                                            handleEnemyHit={this.props.handleEnemyHit}
                                                            additionalClass='shipEnemyHit'
                                                            ship={aiDeployedShip}
                />
              } else {
                //IF THE BLOCK HAS NOT BEEN HIT BEFORE ================================
                aiShipHpBar = <GridGameEnemyShipElement key={`${x},${y}`}
                                                            coordX={x}
                                                            coordY={y}
                                                            handleEnemyHit={this.props.handleEnemyHit}
                                                            additionalClass=''
                                                            ship={aiDeployedShip}
                />
              }

              squares.splice(squares.indexOf(squares[k]),1,aiShipHpBar);
            }
          }
        }

    }

      gridPlayerClass = 'ai';
      // console.log(this.props.playerDeployedShips);
      // console.log(this.props.aiDeployedShips);
    }

    return (
      <>
      <div className={`game-grid ${gridPlayerClass}`} style={{gridTemplate: `repeat(${this.props.maxValues.x}, 1fr) / repeat(${this.props.maxValues.y}, 1fr)`}}>
       {(() => {

       })()}
       {squares}
      </div>
      </>


    )
  }

}
