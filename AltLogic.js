let values = [0, 0, 0, 0, 0];
let throwCount = 0;

function getValues() {
    return values;
}

function throwDice(bools) {
    for (let i = 0; i < values.length; i++) {
        if (!bools[i]) {
            values[Math.floor(Math.random() * 6)];
        }
    }
    throwCount++;
}

function onePairPoints() {
    max = 0;
    faceValue = 0;
    for(i = 0; i < values.length; i++) {
        if(values[i] > max) {
            max = values[i];
            faceValue = i + 1;
        }
    }
    return faceValue * max;
}

throwDice([false, false, false, false, false]);
console.log(values);

console.log(onePairPoints());

