import React from 'react';
import exit from '../../imgs/exit.svg';

export default class HelpDiv extends React.Component {

  render() {
    return (
      <div className='helper'>
        <div className='helper-container'>
          <div className='help-main'>
            <img className='exitIcon' src={exit} alt='exit' onClick={this.props.handler} />
            <h2>Game not starting?</h2>
            <p>Check if all the ships are deployed from the hangar, you cannot sail away without taking all your ships!</p>
            <p>You can change the direction of placing by clicking on the button "Current Placement Direction".</p>
            <p>To relocate a ship, simply click on it on the main grid! It will return to the "SHIPS TO DEPLOY" box.</p>
            <button onClick={this.props.handler}>GOT IT</button>
          </div>
        </div>
      </div>
    )
  }
}
