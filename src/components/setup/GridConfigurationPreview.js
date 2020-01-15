import React from 'react';
import GridSide from '../grid/gridSide.js';

class GridElementPreview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="grid-preview-element" />
    )
  }
}

export default class GridConfigurationPreview extends React.Component {

  render() {
    let squares = [];
    let {x, y} = this.props.maxValues;

    for (let i = 1; i <= x; i++) {
      //y coordinate FOR
      for (let j = 1; j <= y; j++) {
          squares.push(<GridElementPreview key={`${j},${i}`}/>)
      }
    }

    return (
      <div className='grid-preview-container'>
      <p>GRID PREVIEW</p>
        <div className='grid-preview' style={{gridTemplate: `repeat(${x}, 1fr) / repeat(${y}, 1fr)`}}>

          {squares}
        </div>
      </div>
    )
  }
}
