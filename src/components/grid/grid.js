import React from 'react';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let squares = [];
    for (var i = 1; i <= 100; i++) {
      squares.push(<div className="square">{i}</div>)
    }
    return (
      <div className="grid">
        {squares}
        <div className="grid-top" />
      </div>
    )
  }
}
