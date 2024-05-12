const wordText=document.querySelector(".word");
hintText=document.querySelector(".hint span");
refreshBtn=document.querySelector(".refresh-word");
checkBtn=document.querySelector(".check-word");
inputField=document.querySelector("input");
timeText=document.querySelector(".time b")


let correctWord ,timer;

const initTimer= maxTime =>{
    clearInterval(timer);


timer=setInterval(()=>{
    if(maxTime>0){
        maxTime--;
        return timeText.innerHTML=maxTime;
    }
    clearInterval(timer);
    alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
initGame();

},1000);

}

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Fix the random number generation
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerHTML=wordArray.join("");
    hintText.innerHTML=randomObj.hint;
    correctWord=randomObj.word.toLocaleLowerCase();
    inputField.value="";
    inputField.setAttribute("maxlenght",correctWord.lenght);

   

}
initGame();

const checkWord = ()=>{
let userWord=inputField.value.toLocaleLowerCase();
if (!userWord) return alert("Please enter a word check");
if (userWord !== correctWord) {
    alert(`Oops! ${userWord} is not a correct word`);
} else {
    alert(`Congrats! ${userWord.toUpperCase()} is a correct word`);
}
initGame();
}  
refreshBtn.addEventListener("click",initGame);
checkBtn.addEventListener("click",checkWord);
