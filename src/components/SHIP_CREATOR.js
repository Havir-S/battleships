import React from 'react';

//We create all the ships here from the main ships object in the App.js
function CreateShipObjects(x) {
  let arr = [];
  let shipsObj = Object.entries(x);
  for (var i = 0; i < shipsObj.length; i++) {
    // console.log(`i am ${shipsObj[i][0]} and my ships have ${shipsObj[i][1].health} health and there is ${shipsObj[i][1].amount} of them`);
    for (var j = 0; j < shipsObj[i][1].amount; j++) {
      let ship = new ShipClass(shipsObj[i][1].name, shipsObj[i][1].health);
      arr.push(ship);
    }
  }

  return arr;
}

class ShipClass {
  constructor(name,healthNumber) {
    this.name = name;
    this.healthNumber = healthNumber;
    this.blocks = [
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

export {CreateShipObjects, ShipClass};
export default ShipClass;
