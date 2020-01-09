import React from 'react';

class GridSide extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {


    let howMany = this.props.maxValues[this.props.valuesToCheck];
    let staticValues = this.props.staticValues.slice(0, howMany );
    let hey;
    // FIXME: A fast fix for the X bar, values for some reason don't react to auto-fill/auto-fit values in css and have to manually specify the amount of boxes
    if (this.props.valuesToCheck === 'x') {
      hey = `color: 'black'`;
    }

    return (
      <>
      { this.props.valuesToCheck === 'y' ?
        <div className={`grid-side ` + this.props.gridPosition} style={{gridTemplateColumns: `repeat(${howMany}, 1fr)`}}>
          {staticValues.map((el) => <div key={el}>{el}</div>)}
          </div> :

          <div className={`grid-side ` + this.props.gridPosition} style={{hey}}>
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
  }

  render() {
    let { x, y } = this.props.maxValues;


    let squares = [];
    for (var i = 1; i <= x; i++) {
      for (var j = 1; j <= y; j++) {
      squares.push(<div data-coords={`${i},${j}`} className="square" key={`${i},${j}`}>{i}</div>)
      }
    }

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
    </>
    )
  }
}
