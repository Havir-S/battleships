import React from 'react';
import GridSide from './gridSide.js';

class GridElement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div data-coords={`${this.props.coordX},${this.props.coordY}`}
                    className="square"
                    onClick={(e) => {
                      this.props.deployShip(e);
                    }}
                    >
                    {`${this.props.coordX},${this.props.coordY}`}
                    </div>
    )
  }
}

class GridElementShip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div data-coords={`${this.props.coordX},${this.props.coordY}`}
                    className="square ship"
                    onClick={(e) => {
                      this.props.deployShip(e);
                    }}
                    >
                    {`hi`}
                    </div>
    )
  }
}




export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choosenShipDiv: "",
      choosenShipClass: "",
      deploymentDirection: "x"
    }
    this.assignShip = this.assignShip.bind(this);
    this.deployShip = this.deployShip.bind(this);
    this.handleDeploymentDirection = this.handleDeploymentDirection.bind(this);
  }

  //AFTER CLICKING A SHIP
  assignShip(e,x) {
    if (typeof this.state.choosenShipDiv === 'object') {
      this.state.choosenShipDiv.classList.remove('choosenShip');
    }
    e.target.classList.add('choosenShip');
    this.setState({
      choosenShipDiv: e.target,
      choosenShipClass: x
    });
  }

  //EVENT FOR ALL THE SQUARES
  deployShip(x) {

    //if first, we have a selected ship, we then can proceed further with this function,
    //it takes the data from the selected ship and tries to assign it on the grid

    if (typeof this.state.choosenShipDiv === 'object') {
      this.state.choosenShipDiv.classList.remove('choosenShip');

      //we create the HP BLOCKS inside the Ship class
      let firstCoord = x.target.getAttribute('data-coords');
      if (this.state.choosenShipClass.blockSet(firstCoord, this.state.deploymentDirection,this.props.playerDeployedShips,this.props.maxValues)) {
        console.log('hey we got true SO NO DIVS ARE OVERLAPPING');

        //we make it deployed, therefore it will appear on the grid
        this.state.choosenShipClass.changeValue('deployed',true);

        //pushes the new ship to the main array of deployed ships
        this.props.handlePlayerDeployedShips(this.state.choosenShipClass);

      } else {
        console.log('Action stopped, because of overlapping ships');
      }

      //we send this deployed ship higher to the App.js where it is connected to the main state


      //reset of the values
      this.setState({
        choosenShipDiv: "",
        choosenShipClass: ""
      });
    } else {
      console.log('no ship has been choosen so event didnt really fire');
    }
  }

  // DEPLOYMENT SETTINGS ==============================================================

  handleDeploymentDirection() {
    if (this.state.deploymentDirection === 'x') {
      this.setState({deploymentDirection: 'y'});
    } else {
      this.setState({deploymentDirection: 'x'});
    }
  }



  render() {
    //this is how we know how many squares to the grid we need
    let { x, y } = this.props.maxValues;

    // READ ====================================
    // FIRST, WE CREATE THE SQUARES, then we have some fun with the deployed ships array
    // We check the squares for the coords and we replace the empty grid element
    // With the ships healthbar, if the coords match!

    let squares = [];
    //x coordinate FOR
    for (let i = 1; i <= x; i++) {
      //y coordinate FOR
      for (let j = 1; j <= y; j++) {
          squares.push(<GridElement coordX={j}
                                    coordY={i}
                                    deployShip={this.deployShip}
                                    key={`${j},${i}`}
                                     />)
      }
    }

    //Check every square
    for (var z = 0; z < squares.length; z++) {
      //getting the coords of all the squares
      let [ squareCoordX, squareCoordY ] = squares[z].key.split(",");

      //check every ship
      for (let deployedShip of this.props.playerDeployedShips) {

        //check every ships' hpBlocks coords
        for (let hpBlock of deployedShip.blocks) {
          let { x, y } = hpBlock;
          if (x === Number(squareCoordX) && y === Number(squareCoordY)) {
            //we create a replacement for the empty grid
            let shipHpBar = <GridElementShip key={`${x},${y}`} />;

            //and here we replace it
            squares.splice(squares.indexOf(squares[z]),1,shipHpBar);



          }
          // HERE STARTS THE REAL MAGIC WHERE WE REPLACE THE GRID ELEMENTS WITH HP BAR BLOCKS
        }


      }
    }




    // SHIPS ========================================================================

    let ships = [];
    //we filter it so only the not deployed ships show in the settings
    this.props.playerShips.filter(el => el.deployed === false).map((ship,index) => {
      ships.push(
        <div className="ship" key={index}
                              style={{width: `${ship.healthNumber * 100}px`}}
                              onClick={(e) => this.assignShip(e,ship)}
                              >
                              {ship.name}
        </div>
      )
      return;


    })

    // DEPLOYED SHIPS ========================================================================
    let deployedShips = [];

    this.props.playerDeployedShips.map((ship,index) => {
      deployedShips.push(<div className="ship" key={index}
                            style={{width: `${ship.healthNumber * 100}px`}}
                            onClick={(e) => this.assignShip(e,ship)}
                            >
                            {ship.name}
      </div>
    )})

    return (
      <>
        <div className="grid" style={{gridTemplate:`repeat(${x}, 1fr) / repeat(${y}, 1fr)`}}>
        <GridSide gridPosition='grid-top'
                valueType={this.props.startValues.startY}
                maxValues={this.props.maxValues}
                staticValues={this.props.staticValues[this.props.startValues.startY]}
                valuesToCheck='y'
      />
        <GridSide gridPosition='grid-left'
                valueType={this.props.startValues.startX}
                maxValues={this.props.maxValues}
                staticValues={this.props.staticValues[this.props.startValues.startX]}
                valuesToCheck='x'
      />
        {squares}

      </div>
      <button onClick={() => this.props.changeCurrentViewedTab(this.props.currentViewedTab,'add')}
              type="button">
              Go forward
      </button>
      <button onClick={() => this.props.changeCurrentViewedTab(this.props.currentViewedTab,'subtract')}
              type="button">
              Go back
      </button>

      <button onClick={this.handleDeploymentDirection}
              type='button'>
              Current Placement Direction: {this.state.deploymentDirection}
      </button>
      <div className="shipsHangar">
      {ships}
      </div>
      <div className="shipsHangar">
      {deployedShips}
      </div>
    </>
    )
  }
}
