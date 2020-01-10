

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
    this.blocks = [];
    this.deployed = false;
    this.sayAll = this.sayAll.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }
  sayAll() {
    console.log(this);
    console.log(`${this.name} ${this.healthNumber}`)
    console.log(this.blocks);
  }
  changeValue(key,value) {
    this[key] = value;
  }

  //this is where we set the hp
  blockSet(firstCoord,direction) {

    let coords = firstCoord.split(",");
    let coordX = coords[0];
    let coordY = coords[1];
    console.log(this.healthNumber);
    if(direction === 'x') {
      for (var i = 0; i < this.healthNumber; i++) {
        let hpBar = {
          x: Number(coordX) + i,
          y: Number(coordY),
          isHit: false
        }
        console.log(hpBar);
        this.blocks.push(hpBar);
      }
    } else if (direction ==='y') {
      for (var j = 0; j < this.healthNumber; j++) {
        let hpBar = {
          x: Number(coordX),
          y: Number(coordY) + j,
          isHit: false
        }

        this.blocks.push(hpBar);
      }
    }

  }
}

export {CreateShipObjects, ShipClass};
export default ShipClass;
