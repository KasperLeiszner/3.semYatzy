let dice = [0, 0, 0, 0, 0];
let valueFrequency = [0, 0, 0, 0, 0, 0, 0];
let holds = [false, false, false, false, false];
let throwCount = 0;

function getDice() {
    return dice;
}

function throwDice(bools) {
    for (let i = 0; i < bools.length; i++) {
        if (!bools[i]) {
            dice[i] = Math.floor(Math.random() * 6) + 1;
        }
    }
    calcValueFrequency();
    throwCount++;
}

function calcValueFrequency() {
    for(i = 0; i < dice.length; i++) {
        valueFrequency[dice[i]]++;
    }
}

function onePairPoints() {
    for(i = valueFrequency.length - 1; i > 0; i--) {
        if(valueFrequency[i] >= 2) {
            return i * valueFrequency[i];
        }
    }
    return 0;
}

throwDice(holds);
console.log(dice);
console.log(valueFrequency);

console.log(onePairPoints());

