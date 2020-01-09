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
      choosenShip: ""
    }
    this.assignShip = this.assignShip.bind(this);
  }

  assignShip(e) {
    if (typeof this.state.choosenShip === 'object') {
      this.state.choosenShip.classList.remove('choosenShip');
    }
    e.target.classList.add('choosenShip');
    this.setState({choosenShip: e.target});
  }


  render() {
    let { x, y } = this.props.maxValues;


    let squares = [];
    for (var i = 1; i <= x; i++) {
      for (var j = 1; j <= y; j++) {
      squares.push(<div data-coords={`${j},${i}`}
                    className="square"
                    onClick={this.props.checkCoords}
                    key={`${j},${i}`}>
                    {i}
                    </div>)
      }
    }

    console.log(this.props.test);

    // SHIPS ========================================================================

    let ships = [];
    this.props.playerShips.map((ship,index) => {
      ships.push(
        <div className="ship" key={index}
                              style={{width: `${ship.healthNumber * 100}px`}}
                              onClick={(e) => this.assignShip(e)}

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
