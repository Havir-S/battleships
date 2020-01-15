import React from 'react';
import battleship from '../blender/submarine.png';
import smallCaptainAlly from '../blender/captain5.png';
import smallCaptainEnemy from '../blender/captainEnemy1.png';
import wheel from '../imgs/rudder.svg';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    return (
      <div className="nav-container">
        <nav className='main-nav'>

          <div className='logo-div'>
            <img className='logo-ship' src={battleship} alt='battleship' />
            <img className='mini-soldier mini-soldier-left' src={smallCaptainAlly} alt='soldier' />
            <img className='mini-soldier mini-soldier-right' src={smallCaptainEnemy} alt='soldier' />
            <div className='logo-text'>BATTLESHIPS</div>
          </div>

          <div className={this.state.open ? `author-div open` : `author-div`}>
            <div className='author' onClick={this.handleClick}>
              <span>Author</span>

              <img className='author-wheel' src={wheel} alt='wheel' />
            </div>
            <div className='author-links'>
              <div className='author-link-container'>
                <a className='link'>Github</a>
              </div>
              <div className='author-link-container'>
                <a className='link'>Main Site</a>
              </div>
            </div>
          </div>

        </nav>
      </div>
    )
  }
}
