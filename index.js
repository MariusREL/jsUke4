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
        numInput: document.querySelector("#array-num-input"),
        buttons: {
            add: document.querySelector("#array-add-btn"),
            remove: document.querySelector("#array-remove-btn"),
            reverse: document.querySelector("#array-reverse-btn")
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
    // have to define the empty strings outside of the for loop to be able to concatenate inside the forloop
    let randomPwdString1 = "";
    let randomPwdString2 = "";

    //  i runs through the bracketed code 15 times 
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

// add sampleArray items into li items in .array-li

for (const item of sampleArray){
    const list = document.createElement("li")
    list.innerText = item;
    elements.array.arrayList.appendChild(list)
}

