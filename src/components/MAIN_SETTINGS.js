// const SETTINGS = {
//   carriers: {
//     amount: 5,
//     health: 1
//   },
//   battleships: {
//     amount: 4,
//     health: 2
//   },
//   cruisers: {
//     amount: 3,
//     health: 3
//   },
//   submarines: {
//     amount: 2,
//     health: 3
//   },
//   destroyers: {
//     amount: 2,
//     health: 4
//   }
// }

export const SETTINGS = {
  ships: {
    carriers: {
      name: "carriers",
      amount: 0,
      health: 1
    },
    battleships: {
      name: "battleships",
      amount: 0,
      health: 2
    },
    cruisers: {
      name: "cruisers",
      amount: 0,
      health: 3
    },
    submarines: {
      name: "submarines",
      amount: 0,
      health: 3
    },
    destroyers: {
      name: "destroyers",
      amount: 1,
      health: 4
    }
  },
  field: {
    x: 10,
    y: 10
  },
  startValues: {
    startX: "numbers",
    startY: "alphabet_AZ"
  }

};

export const STATICVALUES = {
  alphabet_az: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
  alphabet_AZ: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
  numbers: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
}
