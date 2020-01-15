import React from 'react';

class GridGameEnemyElement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let gridElement;

    gridElement = <div data-coords={`${this.props.coordX},${this.props.coordY}`}
                  className="square squareEnemy"
                  onClick={(x) => this.props.handleEnemyHit(this.props.coordX, this.props.coordY)}
                  />

    return (
      <>
      {gridElement}
      </>
    )
  }
}

class GridGameEnemyShipElement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let gridElement;

    gridElement = <div data-coords={`${this.props.coordX},${this.props.coordY}`}
                  className={`square shipEnemy ${this.props.additionalClass}`}
                  onClick={(x) => this.props.handleEnemyHit(this.props.coordX, this.props.coordY, this.props.ship)}
                  />

    return (
      <>
      {gridElement}
      </>
    )
  }
}

class GridGameShipElement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let gridElement;
    //this hpbar has been hit
    if (this.props.currentHpBlock.isHit) {
      gridElement = (
        <div data-coords={`${this.props.coordX},${this.props.coordY}`}
                      className="square ship shipHit"
                      />
      )
    } else {
      //if the ship is safe and has not been hit
      gridElement = <div data-coords={`${this.props.coordX},${this.props.coordY}`}
                    className="square ship"
                    />
    }

    return (
      <>
      {gridElement}
      </>
    )
  }
}

export default class GridElementGame extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div data-coords={`${this.props.coordX},${this.props.coordY}`}
                    className="square"
                    />
    )
  }
}

export {
  GridElementGame,
  GridGameShipElement,
  GridGameEnemyElement,
  GridGameEnemyShipElement
}
