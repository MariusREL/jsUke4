const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
const generateButton = document.querySelector("#generate-btn")
const generatedPwd1 = document.querySelector("#generated-pwd1")
const generatedPwd2 = document.querySelector("#generated-pwd2")
const stringDisplay = document.querySelector(".string-display")
const enterBtn = document.querySelector("#enter-btn")
const capsBtn = document.querySelector("#caps-btn")
const uncapsBtn = document.querySelector("#uncaps-btn")
const randomcapsBtn = document.querySelector("#randomcaps-btn")
const reverseBtn = document.querySelector("#reverse-btn")
const stringInput = document.querySelector("#string-input")
const stringPara = document.querySelector("#string-para")


function userStringSubmit(){
    if (stringInput.value !== "" && stringInput.value.length <= 27 ){
    stringDisplay.textContent = stringInput.value
    stringInput.value = ""
    stringPara.textContent = "That's a cool string, buddy."
    } else if (stringInput.value === ""){
        stringDisplay.textContent = ""
        stringPara.textContent = "You gotta type a string here or this game doesn't work"
    } else  {stringPara.textContent = "That string is faar too long"}
}

enterBtn.addEventListener("click", userStringSubmit)

stringInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault() 
        userStringSubmit()
    }
})

capsBtn.addEventListener("click", () =>{
    stringDisplay.textContent = stringDisplay.textContent.toLocaleUpperCase()
})

uncapsBtn.addEventListener("click", () =>{
    stringDisplay.textContent = stringDisplay.textContent.toLowerCase()
})

randomcapsBtn.addEventListener("click", function () {
    stringDisplay.textContent = stringDisplay.textContent
    .split("")
    .map(function (char) {
        return Math.random() < 0.5 ? char.toUpperCase() : char.toLowerCase();})
    .join("");
    })

reverseBtn.addEventListener("click", () => {
    stringDisplay.textContent = stringDisplay.textContent
    .split("")
    .reverse()
    .join("")
})

generateButton.addEventListener("click", function() {
    // have to define the empty strings outside of the for loop to be able to concatenate inside the forloop
    let randomPwdString1 = "";
    let randomPwdString2 = "";

    //  i runs through the bracketed code 15 times 
    for (let i = 0; i < 15; i++) {
        randomPwdString1 += characters[Math.floor(Math.random()*characters.length)]
        randomPwdString2 += characters[Math.floor(Math.random()*characters.length)]
    }

    generatedPwd1.textContent = randomPwdString1
    generatedPwd2.textContent = randomPwdString2

    generatedPwd1.addEventListener("click", function(){
        navigator.clipboard.writeText(generatedPwd1.textContent)
        .then(() => alert("Password 1 copied to clipboard!"))
    }
    )
    generatedPwd2.addEventListener("click", function(){
        navigator.clipboard.writeText(generatedPwd2.textContent)
        .then(() => alert("Password 2 copied to clipboard!"))
    }
    )

})