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

function setDice(intArray) {
    dice = intArray;
    calcValueFrequency();
}

function calcValueFrequency() {
    valueFrequency = [0, 0, 0, 0, 0, 0, 0];
    for (i = 0; i < dice.length; i++) {
        valueFrequency[dice[i]]++;
    }
}

function sameValue(value) {
    return valueFrequency[value] * value;
}

function onePairPoints() {
    for (i = valueFrequency.length - 1; i > 0; i--) {
        if (valueFrequency[i] >= 2) {
            return i * 2;
        }
    }
    return 0;
}

function twoPairPoints() {
    max = 0;
    for (i = valueFrequency.length - 1; i > 0; i--) {
        if (valueFrequency[i] >= 2) {
            if (max === 0) {
                max = i * 2;
            }
            else {
                return i * 2 + max;
            }
        }
    }
    return 0;
}

function threeOfAKind() {
    for (i = valueFrequency.length - 1; i > 0; i--) {
        if (valueFrequency[i] >= 3) {
            return i * 3;
        }
    }
    return 0;
}

function fourOfAKind() {
    for (i = valueFrequency.length - 1; i > 0; i--) {
        if (valueFrequency[i] >= 4) {
            return i * 4;
        }
    }
    return 0;
}

function fullHouse() {
    threeSame = 0;
    twoSame = 0;
    for (i = valueFrequency.length - 1; i > 0; i--) {
        if (valueFrequency[i] === 3) {
            threeSame = i * 3
        }
        else if (valueFrequency[i] == 2) {
            twoSame = i * 2;
        }
    }
    if (twoSame !== 0 && threeSame !== 0) {
        return threeSame + twoSame;
    }
    else {
        return 0;
    }
}

function smallStraight() {
    if (valueFrequency.toString() == [0, 1, 1, 1, 1, 1, 0].toString()) {
        return 15;
    }
    else {
        return 0;
    }
}

function bigStraight() {
    if (valueFrequency.toString() == [0, 0, 1, 1, 1, 1, 1].toString()) {
        return 20;
    }
    else {
        return 0;
    }
}

function chance() {
    let sum = 0;
    dice.forEach(value => sum += value)
    return sum;
}

function yatzy() {
    for (i = valueFrequency.length - 1; i > 0; i--) {
        if (valueFrequency[i] === 5) {
            return 50;
        }
    }
    return 0;
}

/*
    
*/
function possibleScorings() {
    scorings = [];
    for (let i = 1; i < 7; i++) {
        scorings.push(sameValue(i));
    }
    let pointsFunctions = [onePairPoints, twoPairPoints, threeOfAKind, fourOfAKind, fullHouse, smallStraight,
        bigStraight, chance, yatzy];

    for (pointsFunction of pointsFunctions) {
        scorings.push(pointsFunction());
    }

    return scorings;
}

//Testing area

// throwDice(holds);
// console.log(dice);
// console.log(valueFrequency);

// setDice([1, 1, 1, 1, 1]);
// console.log(dice);
// console.log(valueFrequency);


// console.log(onePairPoints());
// console.log(twoPairPoints());
// console.log(threeOfAKind());
// console.log(fourOfAKind());
// console.log(fullHouse());
// console.log(smallStraight());
// console.log(bigStraight());
// console.log(chance());
// console.log(yatzy());