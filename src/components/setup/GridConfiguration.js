import React from 'react';
import settingsIcon from '../../imgs/gear.svg';


export default class GridConfiguration extends React.Component {

  render() {
    let { x, y } = this.props.field;
    let options = Object.getOwnPropertyNames(this.props.staticValues);
    return (
      <>
      <h2>FIELD SETTINGS</h2>

      <p className='p-title'>
      Size
      <img className='gearIcon' src={settingsIcon} alt='Show Advanced Grid Options' onClick={this.props.toggleAdvancedGridSettings} />
      </p>
      <p className='p-settings'>
        x:
        <span className='signAction' onClick={() => this.props.gridChangeSize('y','subtract')}>-</span>
        <input type='text' value={y} onChange={(e) => this.props.gridChangeSizeInput(e,'y')} />
        <span className='signAction' onClick={() => this.props.gridChangeSize('y','add')}>+</span>
      </p>

      <p className='p-settings'>
        y:
        <span className='signAction' onClick={() => this.props.gridChangeSize('x','subtract')}>-</span>
        <input type='text' value={x} onChange={(e) => this.props.gridChangeSizeInput(e,'x')}/>
        <span className='signAction' onClick={() => this.props.gridChangeSize('x','add')}>+</span>
      </p>



      {this.props.hasAdvancedGridSettings ?
        <>
          <p className='p-title'>Naming</p>
          <p className='p-settings'>
            x:
            <select name='startX' defaultValue={this.props.startValues['startX']} onChange={this.props.changeStartValues}>
            {options.map((el) => <option value={el} key={el}>{el}</option> )}
            </select>
          </p>
          <p className='p-settings'>
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
