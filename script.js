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

var localStorage = window.localStorage;
localStorage.setItem('counter', 'counter');
let myValue = localStorage.getItem('counter');
console.log(counter)

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

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
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

function resetState() {
    clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  } 
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
     nextButton.classList.remove('hide')
    } else {
      startButton.innerText = 'Store Result & Restart'
      startButton.classList.remove('hide')
    }
}

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

const questions = [
    {
        question: 'Which of the following links a css style sheet to a html document?',
        answers: [
            { text: 'href="style.css"', correct: true },
            { text: 'href="script.js"', correct: false },
            { text: 'src="script.js"', correct: false }
        ] 
    },
    {
        question: 'What is JS short for?',
        answers: [
            { text: 'Java Script', correct: true },
            { text: 'Job Saver', correct: false },
            { text: 'Nothing', correct: false }
        ] 
    },
    {
        question: 'Do you like coding?',
        answers: [
            { text: 'Yes', correct: true },
            { text: 'No', correct: false },
            { text: 'Maybe', correct: false },
        ] 
    }
]

const classToApply = 'wrong';
    if (selectAnswer == currentQuestionIndex) {
        classToApply = 'correct';
    }

document.addEventListener('click',function(event){
    if(event.target.id==='start-btn'){
        countdown(1)
    }
  }); 