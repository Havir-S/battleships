import React from 'react';



// export default class SoundPlayer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.clickCheck = this.clickCheck.bind(this);
//   }
//
//   clickCheck(x) {
//    console.log(x);
//    console.log('helo');
//
//   }
//
//   componentDidMount() {
//   }
//
//   render() {
//     return (
//       <audio name='mainOST' controls={true} onClick={this.clickCheck}>
//         <source src='../src/music/hitMP3.mp3'
//                 type="audio/mp3"
//                 onClick={this.clickCheck}
//         />
//         <source src='./src/music/hitOGG.ogg'
//                 type="audio/ogg"
//                 onClick={this.clickCheck}
//         />
//
//       </audio>
//     )
//   }
// }

// export default class SoundPlayer extends React.Component {
//   constructor(props) {
//     this.state = {
//       play: false
//     }
//     var audio = new Audio(this.props.url);
//   }
//
//   componentDidMount() {
//     audio.addEventListener('ended', () => this.setState({ play: false }));
//   }
//
//   componentWillUnmount() {
//     audio.removeEventListener('ended', () => this.setState({ play: false }));
//   }
//
//   togglePlay = () => {
//     this.setState({ play: !this.state.play }, () => {
//       this.state.play ? this.audio.play() : this.audio.pause();
//     });
//   }
//
//   render() {
//
//     return (
//       <div>
//         <button onClick={this.togglePlay}>{this.state.play ? 'Pause' : 'Play'}</button>
//       </div>
//     );
//   }
// }

export default class SoundPlayer extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      play: false,
      pause: true
    };
    this.play = this.play.bind(this);
    this.url = "./src/music/hitMP3.mp3";
    this.audio = new Audio(this.url);

  }

  play(){
    this.setState({
      play: true,
      pause: false
    });
    this.audio.play();
  }

  pause(){
  this.setState({ play: false, pause: true });
    this.audio.pause();
  }

  render() {
    console.log(this.audio);
    console.log(this.url);
  return (
    <div>
      <button onClick={this.play}>Play</button>
      <button onClick={this.pause}>Pause</button>
    </div>
    );
  }
}
