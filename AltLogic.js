let dice = [0, 0, 0, 0, 0];
let throwCount = 0;

function getDice() {
    return dice;
}

function throwDice(bools) {
    for (let i = 0; i < bools.length; i++) {
        if (!bools[i]) {
            console.log(i);
            dice[i] = Math.floor(Math.random() * 6) + 1;
        }
    }
    throwCount++;
}

function onePairPoints() {
    
}

throwDice([false, false, false, false, false]);
console.log(values);

console.log(onePairPoints());

