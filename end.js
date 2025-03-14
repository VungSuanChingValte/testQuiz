
const username=document.getElementById("username");
const saveScoreBtn=document.getElementById("saveScoreBtn");
const finalScore=document.getElementById("finalScore");
const mostRecentScore=localStorage.getItem("mostRecentScore");

const highScore=JSON.parse(localStorage.getItem("highScore")) || [];
console.log(highScore);
finalScore.innerText=mostRecentScore;
username.addEventListener("keyup",()=>{
    saveScoreBtn.disabled= !username.value;
});
saveHighScore=e=>{
    console.log("click the save button!!");
    e.preventDefault();

    const score={
        score:Math.floor(Math.random()*40),
        name: username.value
    };
    highScore.push(score);
    highScore.splice(10);

    localStorage.setItem("highScore", JSON.stringify(highScore));
    window.location.assign();
    console.log(highScore);
};