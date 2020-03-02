let diceImg = [];
let total = 0;

document.body.innerHTML = "<div id='contentContainer'></div>";
let contentContainer = document.querySelector('#contentContainer');

initHeader();
initFooter();
assignEvents();


function assignEvents() {
    let rollBtn = document.querySelector("#rollBtn");
    rollBtn.onclick = throwDiceEvent;

    let inputElement = document.querySelectorAll('.field');
    for (let field of inputElement) {
        field.onclick = chosenField;
    }

    let diceElement = document.querySelectorAll('.dice');
    for (let die of diceElement) {
        die.onclick = holdEvent;
    }
}

function initHeader() {
    contentContainer.innerHTML += "<div id='header'></div>";
    let header = document.querySelector('#header');

    header.innerHTML += "<div id='dice'></div>"
    let diceDiv = document.querySelector('#dice');

    for (let i = 0; i < dice.length; i++) {
        let id = "dieImg" + i;
        diceDiv.innerHTML += "<img id='" + id + "' class = 'dice' data-dieNum = '" + i + "'></img>";
        let img = document.querySelector("#" + id);
        diceImg.push(img);
    }

    updateDiceImg();

    header.innerHTML += "<div id='lowerContent'></div>";
    let lowerContent = document.querySelector('#lowerContent');

    lowerContent.innerHTML += "<label id='turnLbl'>Turn: " + throwCount + "</label>";
    lowerContent.innerHTML += "<button id='rollBtn'>Roll</button>";
}

function initFooter() {
    contentContainer.innerHTML += "<div id='footer'></div>";
    let footer = document.querySelector('#footer');
    footer.innerHTML += "<div id='labelCon'></div>";
    footer.innerHTML += "<div id='inputCon'></div>";
    footer.innerHTML += "<div id='sumCon'></div>";
    footer.innerHTML += "<div id='bonusCon'></div>";
    footer.innerHTML += "<div id='totalCon'></div>";

    let fields = ["1-s", "2-s", "3-s", "4-s", "5-s", "6-s", "One Pair", "Two Pairs", "Three Same",
    "Four Same", "Full House", "Small Straight", "Large Straight", "Chance", "Yatzy"];

    let specialFields = ["Sum", "Bonus", "Total"];
    let labelCon = document.querySelector('#labelCon');
    let inputCon = document.querySelector('#inputCon');

    for (let field of fields) {
        labelCon.innerHTML += "<label>" + field + "</label>";
        inputCon.innerHTML += "<input class='field'readonly></input>";
    }

    for (let field of specialFields) {
        footer.innerHTML += "<label>" + field + "<input id='" + field + "'readonly></input></label>"
    }

    updateFields();
}

function chosenField(event) {
    let totalField = document.querySelector('#Total');
    let sumField = document.querySelector('#Sum');
    let bonus = document.querySelector('#Bonus');
    let sum = null;

    event.target.disabled = true;
    event.target.className = "chosen";
    
    let fields = document.querySelectorAll('.field, .chosen');
    for (let i = 0; i < 6; i++) {
        if (fields[i].className === 'chosen') {
            sum += parseInt(fields[i].value);
        }
    }

    sumField.value = sum;

    if (sum >= 63 && bonus.className !== 'granted') {
        total += 50;
        bonus.value = 50;
        bonus.className = 'granted';
    }

    total += parseInt(event.target.value);
    totalField.value = total;
    resetThrow();
    updateFields();
    updateDiceImg();

    let diceImgs = document.querySelectorAll('.dice');
    for (let die of diceImgs) {
        die.style.opacity = '100%';
    }

    document.querySelector('#rollBtn').disabled = false;

    if (document.querySelectorAll('.field').length === 0) {
        endGame();
    }
}

function endGame() {
    if (confirm("Dit samlede resultat er: " + total + "\nVil du spille igen?")) {
        let sumField = document.querySelector('#Sum');
        let bonus = document.querySelector('#Bonus');
        let totalField = document.querySelector('#Total');

        sumField.value = null;
        bonus.value = null;
        
        total = null;
        totalField.value = total;
        resetThrow();
        let chosenFields = document.querySelectorAll('.chosen');

        for (let field of chosenFields) {
            field.disabled = false;
            field.className = 'field';
            field.value = 0;
        }
    }
}

function throwDiceEvent(event) {
    throwDice(holds);
    updateDiceImg();
    updateFields();
    document.querySelector("#turnLbl").innerHTML = "Turn: " + throwCount; 

    if (throwCount > 2) {
        document.querySelector('#rollBtn').disabled = true;
    }     
}

function updateFields() {
    let fields = document.querySelectorAll('.field, .chosen');
    let scorings = possibleScorings();

    for(let i = 0; i < fields.length; i++) {
        if (fields[i].className === 'field') {
            fields[i].value = scorings[i];
        }
    }
}

function holdEvent(event) {
    let index = event.target.getAttribute('data-dieNum');

    holds[index] = !holds[index];

    if (holds[index]) {
        event.target.style.opacity = '50%';
    }
    else {
        event.target.style.opacity = '100%';
    }
}

function updateDiceImg() {
    let path = "./imgs/"

    for (let i in diceImg) {
        let target = document.querySelector("#" + diceImg[i].id);

        switch(dice[i]) {
            case 1:
                target.src = path + "One.png";
                break;
    
            case 2:
                target.src = path + "Two.png";
                break;
    
            case 3: 
                target.src = path + "Three.png";
                break;
    
            case 4:
                target.src = path + "Four.png"
                break;
    
            case 5:
                target.src = path + "Five.png"
                break;
    
            case 6:
                target.src = path + "Six.png"
                break;
            
            default:
                target.src = "";
                break;
        }
    }
}