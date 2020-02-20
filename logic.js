let amountOfFaces = 6;
let turn = 1;

let diceCup = {
    diceArray: [],

    addDie(amount) {
        for(let i = 0; i < amount; i++) {
            this.diceArray.push(createDie(amountOfFaces));
        }
    },

    rollAll() {
        for (die of this.diceArray) {
            die.roll();
        }
    }

} 

function createDie(amountOfFaces) {
    return {
        amountOfFaces: amountOfFaces,

        value: 0,

        roll() {
            this.value = Math.floor(Math.random() * this.amountOfFaces + 1);
        }
    }
}

diceCup.addDie(6);
diceCup.rollAll();
console.log(diceCup.diceArray[0].value);
diceCup.diceArray[0].roll();
console.log(diceCup.diceArray[0].value);