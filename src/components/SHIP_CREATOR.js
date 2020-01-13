

//We create all the ships here from the main ships object in the App.js
function CreateShipObjects(x) {
  let arr = [];
  let shipsObj = Object.entries(x);
  for (let i = 0; i < shipsObj.length; i++) {
    for (let j = 0; j < shipsObj[i][1].amount; j++) {
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
    this.changeValue = this.changeValue.bind(this);
    this.blockSet = this.blockSet.bind(this);
  }

  changeValue(key,value) {
    this[key] = value;
  }

  //this is where we set the hp
  blockSet(firstCoord,direction,deployedShips,maxValues) {
    let coords = firstCoord.split(",");
    let coordX = coords[0];
    let coordY = coords[1];
    let hpBar;
    this.blocks = [];

    if (direction === 'x') {
      for (let i = 0; i < this.healthNumber; i++) {
        hpBar = {
          x: Number(coordX) + i,
          y: Number(coordY),
          isHit: false
        }
        this.blocks.push(hpBar);
      }
    } else if (direction ==='y') {
      for (let j = 0; j < this.healthNumber; j++) {
        hpBar = {
          x: Number(coordX),
          y: Number(coordY) + j,
          isHit: false
        }
        this.blocks.push(hpBar);
      }
    }

    //Check if coords do not overlapse!

    //we're checking for all the hpblocks
    for (let thisBlock of this.blocks) {
      let coordX = thisBlock.x;
      let coordY = thisBlock.y;
      //checking for all the deployed ships
      if(thisBlock.x > maxValues.y || thisBlock.y > maxValues.x) {
        this.blocks = [];
        return false;
      }
    for (let ship of deployedShips) {

      //checking the deployed ships coords
      for (let block of ship.blocks) {
        let {x, y} = block;
        if ((x === coordX && y === coordY) || coordX > maxValues.y || coordY > maxValues.x) {
          this.blocks = [];
          return false;
        }
      }
    }
  }


    return true;
  }
}

export {CreateShipObjects, ShipClass};
export default ShipClass;
