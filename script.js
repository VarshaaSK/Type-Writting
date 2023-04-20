const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".wrapper .input-field");
const mistaketTag = document.querySelector(".mistake span");
const timeTag = document.querySelector(".time span b");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const tryAgainBtn = document.querySelector("button");

let timer, maxTime = 60 , timeLeft = maxTime;

let charIndex = mistakes = isTyping = 0;

function randomParagraph(){
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";

    paragraphs[randomIndex].split("").forEach(span => {
        let spantag = `<span>${span}</span>`;
        typingText.innerHTML += spantag;
    });

    document.addEventListener("keydown", () => inputField.focus());
    typingText.addEventListener("click", () => inputField.focus());
}

function initTyping(){
    const characters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];

    if(charIndex < characters.length - 1 && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null){
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect")){
                mistakes--;
            }
            characters[charIndex].classList.remove("correct","incorrect");
        }
        else{
            if(characters[charIndex].innerText === typedChar){
                characters[charIndex].classList.add("correct");
            }
            else{
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
    
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        //if wpm value is 0, null or infinity setting its value to 0
        wpm = wpm < 0 || !wpm || wpm == Infinity ? 0 :wpm;
        mistaketTag.innerHTML = mistakes;
        wpmTag.innerText = wpm;
        // cpmTag.innerText = charIndex - mistakes;

        let cpm = ((charIndex - mistakes) / charIndex) * 100;
        cpmTag.innerText = (cpm).toFixed(2);
        cpm = cpm < 0 || !cpm || cpm == Infinity ? 0 : cpm;
    }
    else{
        inputField.value = "";
        clearInterval(timer);
    }
}

function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
    }
    else{
        clearInterval(timer);
    }
}

function resetGame(){
    randomParagraph();
    inputField.value="";
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistaketTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

randomParagraph();
inputField.addEventListener("input" , initTyping);
tryAgainBtn.addEventListener("click" , resetGame);