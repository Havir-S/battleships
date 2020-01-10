import React from 'react';

class GridSide extends React.Component {


  render() {
    let howMany = this.props.maxValues[this.props.valuesToCheck];
    let staticValues = this.props.staticValues.slice(0, howMany );
    // FIXME: A fast fix for the X bar, values for some reason don't react to auto-fill/auto-fit values in css and have to manually specify the amount of boxes

    return (
      <>
      { this.props.valuesToCheck === 'y' ?
        <div className={`grid-side ` + this.props.gridPosition} style={{gridTemplateColumns: `repeat(${howMany}, 1fr)`}}>
          {staticValues.map((el) => <div key={el}>{el}</div>)}
          </div> :

          <div className={`grid-side ` + this.props.gridPosition}>
            {staticValues.map((el) => <div key={el}>{el}</div>)}
          </div>

      }

      </>
    )
  }
}


export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choosenShipDiv: "",
      choosenShipClass: ""
    }
    this.assignShip = this.assignShip.bind(this);
    this.deployShip = this.deployShip.bind(this);
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
      //we make it deployed, therefore it will appear on the grid
      this.state.choosenShipClass.changeValue('deployed',true);
      //we create the HP BLOCKS inside the Ship class
      let firstCoord = x.target.getAttribute('data-coords');
      this.state.choosenShipClass.blockSet(firstCoord, 'x');

      //we send this deployed ship higher to the App.js where it is connected to the main state
      this.props.handlePlayerDeployedShips(this.state.choosenShipClass);

      //reset of the values
      this.setState({
        choosenShipDiv: "",
        choosenShipClass: ""
      });
    } else {
      console.log('no ship has been choosen so event didnt really fire');
    }
  }



  render() {
    //this is how we know how many squares to the grid we need
    let { x, y } = this.props.maxValues;


    let squares = [];
    //x coordinate FOR
    for (let i = 1; i <= x; i++) {
      //y coordinate FOR
      for (let j = 1; j <= y; j++) {
        //check if the deployed ships coords match with the current coords, if so, then mark it

          //deployed ships FOR
          for (let k = 0; k < this.props.playerDeployedShips.length; k++) {

            //ships healthBlocks FOR
            for (let m = 0; m < this.props.playerDeployedShips[k]['blocks'].length; m++) {
              if (this.props.playerDeployedShips[k]['blocks'][m]['x'] === i && this.props.playerDeployedShips[k]['blocks'][m]['y'] === j ) {
                console.log('found the good coords sir');
                console.log(`${i} and ${j}`);

                squares.push(<div data-coords={`${j},${i}`}
                              className="square ship"
                              onClick={(e) => {
                                this.deployShip(e);
                              }}
                              key={`${j},${i}`}>
                              {i}
                              </div>);
              } else {
                console.log('ding');

              }
            }
          }
          squares.push(<div data-coords={`${j},${i}`}
                        className="square"
                        onClick={(e) => {
                          this.deployShip(e);
                        }}
                        key={`${j},${i}`}>
                        {i}
                        </div>);


      }
    }

    // squares.map(el => {
    //   console.log(el.props['data-coords']);
    // })



console.log(this.props.playerDeployedShips);

    // SHIPS ========================================================================

    let ships = [];
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

      <div className="shipsHangar">
      {ships}
      </div>
    </>
    )
  }
}
