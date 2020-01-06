import React from 'react';

// export default class Ship extends React.Component {
//
//
// render() {
//   return (
//     <div>
//       hello
//     </div>
//   )
// }
//
// }

class ShipClass {
  constructor(name,healthNumber) {
    this.name = name;
    this.healthNumber = healthNumber;
    this.healthObj = [
      {
        posX: 5,
        posY: 6,
        hit: false
      },
      {
        posX: 5,
        posY: 7,
        hit: false
      },
      {
        posX: 5,
        posY: 8,
        hit: false
      }
    ]
  }
  sayAll() {
    console.log(`${this.name} ${this.healthNumber}`)
  }
}

let Ship = 'x';
export {Ship, ShipClass};
export default ShipClass;
