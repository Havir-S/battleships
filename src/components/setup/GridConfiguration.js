import React from 'react';

export default class GridConfiguration extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { x, y } = this.props.field;
    let options = Object.getOwnPropertyNames(this.props.staticValues);
    return (
      <>
      <p>Field</p>

      <p>x:
        <span onClick={() => this.props.gridChangeSize('y','subtract')}>-</span>
        <input type='text' value={y} onChange={(e) => this.props.gridChangeSizeInput(e,'y')} />
        <span onClick={() => this.props.gridChangeSize('y','add')}>+</span>
      </p>

      <p>y:
        <span onClick={() => this.props.gridChangeSize('x','subtract')}>-</span>
        <input type='text' value={x} onChange={(e) => this.props.gridChangeSizeInput(e,'x')}/>
        <span onClick={() => this.props.gridChangeSize('x','add')}>+</span>
      </p>

      <button type="button" onClick={this.props.toggleAdvancedGridSettings}>Show Advanced Grid options</button>

      {this.props.hasAdvancedGridSettings ?
        <>
          <p>Naming</p>
          <p>
            x:
            <select name='startX' defaultValue={this.props.startValues['startX']} onChange={this.props.changeStartValues}>
            {options.map((el) => <option value={el} key={el}>{el}</option> )}
            </select>
          </p>
          <p>
            y:
            <select name='startY' defaultValue={this.props.startValues['startY']} onChange={this.props.changeStartValues}>
            {options.map((el) => <option value={el} key={el}>{el}</option> )}
            </select>
          </p>
        </> :
        <></>
      }

      </>
    )
  }
}
