// const { createElement } = require("react");

const CHARACTERS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

const sampleArray = ["Emil", "og", "Shrek", "Bor", "i", "en", "sump", "sammen"]
// Samler elementene i et object for systematikk og lettere leselighet
const elements = {
    
    string: {
        display: document.querySelector(".string-display"),
        input: document.querySelector("#string-input"),
        para: document.querySelector("#string-para"),
        buttons: {
            enter: document.querySelector("#enter-btn"),
            caps: document.querySelector("#caps-btn"),
            uncaps: document.querySelector("#uncaps-btn"),
            randomcaps: document.querySelector("#randomcaps-btn"),
            reverse: document.querySelector("#reverse-btn")
        }
    },
    password: {
        generate: document.querySelector("#generate-btn"),
        output1: document.querySelector("#generated-pwd1"),
        output2: document.querySelector("#generated-pwd2")
    },
    
    array: {
        arrayList: document.querySelector(".array-list"),
        itemInput: document.querySelector("#array-item-input"),
        selectEl: document.querySelector("#firstOrLast"),
        buttons: {
            add: document.querySelector("#array-add-btn"),
            remove: document.querySelector("#array-remove-btn"),
            reverse: document.querySelector("#array-reverse-btn"),
            clear: document.querySelector("#array-clear-btn")
        }
    },
    
};

// Gjor legg til tekst funksjonell i string-seksjonen, koden snakker litt for seg selv.
function userStringSubmit(){
    if (elements.string.input.value !== "" && elements.string.input.value.length <= 27 ){
    elements.string.display.textContent = elements.string.input.value
    elements.string.input.value = ""
    elements.string.para.textContent = "That's a cool string, buddy."
    } else if (elements.string.input.value === ""){
        elements.string.display.textContent = ""
        elements.string.para.textContent = "You gotta type a string here or this game doesn't work"
    } else  {elements.string.para.textContent = "That string is faar too long"}
}
// gir funksjon til enterknappen, inkluderer muligheten til aa trykke enter for submit og fjerner defaultfunksjonen som gaar til neste linje
elements.string.buttons.enter.addEventListener("click", userStringSubmit)

elements.string.input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault() 
        userStringSubmit()
    }
})


// funksjoner for knappene i stringseksjon
elements.string.buttons.caps.addEventListener("click", () =>{
    elements.string.display.textContent = elements.string.display.textContent.toLocaleUpperCase()
})

elements.string.buttons.uncaps.addEventListener("click", () =>{
    elements.string.display.textContent = elements.string.display.textContent.toLowerCase()
})

elements.string.buttons.randomcaps.addEventListener("click", function () {
    elements.string.display.textContent = elements.string.display.textContent
    .split("")
    .map(function (char) {
        return Math.random() < 0.5 ? char.toUpperCase() : char.toLowerCase();})
    .join("");
    })

elements.string.buttons.reverse.addEventListener("click", () => {
    elements.string.display.textContent = elements.string.display.textContent
    .split("")
    .reverse()
    .join("")
})

elements.password.generate.addEventListener("click", function() {

    let randomPwdString1 = "";
    let randomPwdString2 = "";

    for (let i = 0; i < 15; i++) {
        randomPwdString1 += CHARACTERS[Math.floor(Math.random()*CHARACTERS.length)]
        randomPwdString2 += CHARACTERS[Math.floor(Math.random()*CHARACTERS.length)]
    }

    elements.password.output1.textContent = randomPwdString1
    elements.password.output2.textContent = randomPwdString2

    elements.password.output1.addEventListener("click", function(){
        navigator.clipboard.writeText(elements.password.output1.textContent)
        .then(() => alert("Password 1 copied to clipboard!"))
    }
    )
    elements.password.output2.addEventListener("click", function(){
        navigator.clipboard.writeText(elements.password.output2.textContent)
        .then(() => alert("Password 2 copied to clipboard!"))
    }
    )

})

// function to update the dom so that the array is kept up to date with changes
function updateArray(){
    elements.array.arrayList.textContent = ""
for (const item of sampleArray){
    const list = document.createElement("li")
    list.innerText = item;
    elements.array.arrayList.appendChild(list)
}}
updateArray()


elements.array.buttons.add.addEventListener("click", function(){
    const userInputValue = elements.array.itemInput.value;
    // stops the user from making the array too long
    if (sampleArray.length >= 12) {
        return;
    }
// unshifts if first element is chosen in the drop down, pushes if not
    if (elements.array.selectEl.value === "first-element") {
        sampleArray.unshift(userInputValue);
    } else {
        sampleArray.push(userInputValue);
    }
    elements.array.itemInput.value = "";
    updateArray();
});

// if the user types in a word matching another word in the array it removes that, case sensitive. If not the functions shifts or pops depending on dropdown selected
elements.array.buttons.remove.addEventListener("click", function(){
    const userInputValue = elements.array.itemInput.value;
    
    if (userInputValue) {
        if (sampleArray.indexOf(userInputValue) !== -1) {
            sampleArray.splice(sampleArray.indexOf(userInputValue), 1);
        }
    } else {
        if (elements.array.selectEl.value === "first-element") {
            sampleArray.shift();
        } else {
            sampleArray.pop();
        }
    }
    
    elements.array.itemInput.value = "";
    updateArray();
});


// converts the html list of the children of the OL element(all the li) and converts it into an array so that I can reverse it. Removes everything first then repopulates the whole thing in reverse
elements.array.buttons.reverse.addEventListener("click", function(){
    const items = Array.from(elements.array.arrayList.children);
    elements.array.arrayList.innerHTML = '';
    items.reverse().forEach(item => {
        elements.array.arrayList.appendChild(item);
    });
});


// clears out the array on normal click, repopulates it on shift-click
elements.array.buttons.clear.addEventListener("click", (e) => {
    if(e.shiftKey){
        sampleArray.length = 0;
        sampleArray.push(...["Emil", "og", "Shrek", "Bor", "i", "en", "sump", "sammen"]);
    } else {
        sampleArray.length = 0;
    }
    updateArray();
});