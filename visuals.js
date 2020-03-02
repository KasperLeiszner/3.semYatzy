let diceImg = [];
let sum = 0;

document.body.innerHTML = "<div id='contentContainer'></div>";
let contentContainer = document.querySelector('#contentContainer');

initHeader();
initFooter();
assignEvents();


function assignEvents() {
    let rollBtn = document.querySelector("#rollBtn");
    rollBtn.onclick = throwDiceEvent;

    let inputObj = document.querySelectorAll('.field');
    for (let field of inputObj) {
        field.onclick = chosenField;
    }
}

function initHeader() {
    contentContainer.innerHTML += "<div id='header'></div>";
    let header = document.querySelector('#header');

    header.innerHTML += "<div id='dice'></div>"
    let diceDiv = document.querySelector('#dice');

    for (let i in dice) {
        let id = "dieImg" + i;
        diceDiv.innerHTML += "<img id='" + id + "'></img>";
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

    let fields = ["1-s", "2-s", "3-s", "4-s", "5-s", "6-s", "One Pair", "Two Pairs", "Three Same",
    "Four Same", "Full House", "Small Straight", "Large Straight", "Chance", "Yatzy"];

    let specialFields = ["Sum", "Bonus", "Total"];

    for (let field of fields) {
        footer.innerHTML += "<label>" + field + "<input class='field'readonly></input></label>"
    }

    for (let field of specialFields) {
        footer.innerHTML += "<label>" + field + "<input id='" + field + "'readonly></input></label>"
    }
}

function chosenField(event) {
    event.target.disabled = true;
    event.target.className = "chosen";

    let total = document.querySelector('#Total');

    sum += parseInt(event.target.value, 10);
    total.value = sum;
    document.querySelector('#rollBtn').disabled = false;
    updateFields();
}

function throwDiceEvent(event) {
    if (throwCount <= 2) {
        throwDice(holds);
        updateDiceImg();
        document.querySelector("#turnLbl").innerHTML = "Turn: " + throwCount;
        updateFields();   
    }
    else {
        document.querySelector('#rollBtn').disabled = true;
    }     
}

function updateFields() {
    let fields = document.querySelectorAll('.field');
    let scorings = possibleScorings();

    for(let i = 0; i < fields.length; i++) {
        fields[i].value = scorings[i];
    }
}

function holdEvent() {
    
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