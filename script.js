const initials = document.getElementById("initials");
const btnSave = document.getElementById("initialsbtn");
const lsOutput = document.getElementById("highScores");
let highScores = []

//timer function borrowed from here: https://gist.github.com/adhithyan15/4350689 
function countdown(minutes) {
    var seconds = 60;
    var mins = minutes
    function tick() {
        var counter = document.getElementById("counter");
        var current_minutes = mins-1
        seconds--;
        counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            if(mins > 1){
                countdown(mins-1);          
            }
        }
    }
    tick();
}

//var score = JSON.parse(localStorage.counter); turns back into an object
//console.log(localStorage.getItem('counter'));
//localStorage.valueOf(counter) - run this in inspector to see the string

function log_console() {
counter.classList.add("hide");
document.getElementById("logbtn").classList.add("hide");
var localStorage = window.localStorage;
localStorage.setItem('score', JSON.stringify(counter.innerHTML))
console.log(counter)
}

document.getElementById("logbtn").addEventListener("click", function() {
    document.getElementById("scorefield").classList.add("show");
  });

//const initials = document.getElementById("initials");
localStorage.setItem('initials', JSON.stringify(initials.value));
//localStorage.getItem('initials')


/*function log_initials() {
    var localStorage = window.localStorage;
    localStorage.setItem('initials', JSON.stringify(initials.innerHTML))
    console.log(initials)
    }
*/

/*much of the functionality is derived from here: https://www.youtube.com/watch?v=riDzcEQbX6k 
This seemed to be the most efficient and elegant code to produce a quiz I could find */

//gets all relevant elements from html 
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion() 
}) 

/* startGame function starts the game. The add and remove hide css classes below
makes the start button dissapear and the question container appear*/
function startGame() {   
    startButton.classList.add('hide') 
    shuffledQuestions = questions.sort(() => Math.random() - .5) //gives a random array
    currentQuestionIndex = 0 //starts on the first question
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

//this function sets the next question when the next button is clicked
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => { //loops through answers
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

//resets everything back to default state every time there is a new question
function resetState() {
    clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) { //loops through all children for answer button elements
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  } 
}

function selectAnswer(e) { //takes event in as a parameter
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => { //changes from live collection to an array to work with for each loop
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
     nextButton.classList.remove('hide')
    } else {
      startButton.innerText = 'The End! Stop clock below'
      startButton.classList.remove('hide')
    }
}

//sets status based on whether selected answer was correct or wrong
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

/*List of questions. I can add as many/few questions as desired here, and with as many
answers per question desired. Utilises objects, elements and arrays */
const questions = [
    {
        question: 'Which of the following links a css style sheet to a html document?',
        answers: [
            { text: 'href="style.css"', correct: true },
            { text: 'href="script.js"', correct: false },
            { text: 'src="script.js"', correct: false },
            { text: 'src="style"', correct: false }
        ] 
    },
    {
        question: 'What is JS short for?',
        answers: [
            { text: 'Job Saver', correct: false },
            { text: 'JavaScript', correct: true },
            { text: 'Nothing', correct: false },
            { text: 'JSON', correct: false }
        ] 
    },
    {
        question: 'What is node.js?',
        answers: [
            { text: 'Abnormal tissue growth', correct: false },
            { text: 'An application', correct: false },
            { text: 'A platform to build websites', correct: true },
            { text: 'A server', correct: false }
        ] 
    },
    {
        question: 'Which of the following is an example of a variable',
        answers: [
            { text: 'variable', correct: false },
            { text: 'varied = 32', correct: false },
            { text: 'vary = 32', correct: false },
            { text: 'var score = 32', correct: true },
        ] 
    },
    {
        question: 'What does the command line do?',
        answers: [
            { text: 'Process commands', correct: true },
            { text: 'Build APIs', correct: false },
            { text: 'It does not relate to coding', correct: false },
            { text: 'Run an operating system', correct: false }
        ] 
    },
]

/*this idea came from https://www.youtube.com/watch?v=_LYxkClHnV0. It applies a correct or wrong classes
and enabled me to appky css pseudo-classes to answers */
const classToApply = 'wrong';
    if (selectAnswer == currentQuestionIndex) {
        classToApply = 'correct';
    }

//listens for click of timer and commences countdown
document.addEventListener('click',function(event){
    if(event.target.id==='start-btn'){
        countdown(1)
    }
  });

btnSave.onclick = function () {
    const key = initials.value;
    const value = localStorage.getItem('score');
    console.log(key);
    console.log(value)

    if (key && value) {
        localStorage.setItem(key, value);
        //location.reload();
    }
}

/*for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    lsOutput.innerHTML += localStorage.key 

}
*/

//document.getElementById("scorelist").textContent=localStorage.getItem('score')

//loops through local storage and appends the latest score to the scoreboard
document.getElementById('initialsbtn').addEventListener('click', function(){
    var list = document.getElementById("scorelist");
    for (var i = 0; i < localStorage.length; i++){
      if(localStorage.key(i).indexOf("score") !== -1){
        var item = document.createElement("li");
        item.textContent = localStorage.getItem(localStorage.key(i));
        list.appendChild(item);
      }
    }
})
//console.log(highScores[0].score)
//console.log(localStorage);
//console.log(highScores)

document.getElementById('initialsbtn').addEventListener('click', function(){
    var playerScore = {
        initial: document.getElementById('initials').value,
        score: localStorage.getItem('score'),
    }
    highScores.push(playerScore)
    console.log(highScores)
})