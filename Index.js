const question=document.getElementById('question');
const choices=document.getElementsByClassName('choice-text');
const queationCounterText=document.getElementById('quetioncounter');
const scoreText=document.getElementById('score');
const loader=document.getElementById("loader");
const game=document.getElementById("game");

let currentQuestion={};
let acceptingAnswers=false;
let score=0;
let queationCounter=0;
let availableQues=[];
let questions=[];

fetch("https://opentdb.com/api.php?amount=30&category=9&difficulty=easy&type=multiple").then(res=>{
    console.log(res);
    return res.json();
}).then(loadedQuestion =>{
    console.log(loadedQuestion.results );
    loadedQuestion.results.map(loadedQuestion =>{
        const formattedQuestion={
            question: loadedQuestion.question
        };

        const answerChoices=[...loadedQuestion.incorrect_answers];
        formattedQuestion.answer=Math.floor(Math.random()*3)+1;
        answerChoices.splice(formattedQuestion.answer -1,0, loadedQuestion.correct_answer);

        answerChoices.forEach((choice,index) => {
            formattedQuestion["choice"+(index+1)]=choice;
        });
        return formattedQuestion;
    }
    );
    
    startGame();
});

//constance
const CORRECT_BONUS=2;
const maxQ=30;
startGame=()=>{
    queationCounter=0;
    score=0;
    availableQues={...questions};
    console.log(availableQues);
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion=()=>{
    if(availableQues.length === 0 || queationCounter>= maxQ ){
        localStorage.setItem("mostRecentScore",score);
        return window.location.assign("end.html");
    }
    queationCounter++;
    queationCounterText.innerText=queationCounter+"/"+maxQ;
    const quesIndex=Math.floor(Math.random()*availableQues.length);
    question.innerText=currentQuestion.question;
    
    choices.forEach(choice=>{
        const num=choice.dataset['num'];
        choice.innerText=currentQuestion["choice"+num];
    });

    availableQues.splice(quesIndex,1);
    acceptingAnswers=true;
};
choices.forEach(choice=>{
    choice.addEventListener('click',e=>{
        if(!acceptingAnswers) return;

        acceptingAnswers=false;
        const selecterChoice=e.target;
        const selectedAnswer=selecterChoice.dataset["num"];
        const classToApply='incorrect';
        if(selectedAnswer== currentQuestion.answer){
            classToApply='correct';
        }
        if(classToApply ==="correct"){
            incrementScore(CORRECT_BONUS);
        }

        selecterChoice.parentElement.classList.add(classToApply);
setTimeout(() => {
    selecterChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
         },1000);
         
    });
})
incrementScore=number=>{
    score+=number;
    scoreText.innerText=score;
};
