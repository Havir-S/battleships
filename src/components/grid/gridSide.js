import React from 'react';

export default class GridSide extends React.Component {


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
