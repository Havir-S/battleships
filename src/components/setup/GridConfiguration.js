import React from 'react';

export default class GridConfiguration extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { x, y } = this.props.field;
    return (
      <>
      <p>Field</p>

      <p>x:
        <span onClick={() => this.props.gridChangeSize('x','subtract')}>-</span>
        <input type='text' value={x} onChange={(e) => this.props.gridChangeSizeInput(e,'x')}/>
        <span onClick={() => this.props.gridChangeSize('x','add')}>+</span>
      </p>

      <p>y:
        <span onClick={() => this.props.gridChangeSize('y','subtract')}>-</span>
        <input type='text' value={y} onChange={(e) => this.props.gridChangeSizeInput(e,'y')} />
        <span onClick={() => this.props.gridChangeSize('y','add')}>+</span>
      </p>

      <p>Naming</p>
      <p>x: Numbers</p>
      <p>y: Letters</p>
      </>
    )
  }
}
