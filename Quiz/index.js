const rulesContainer = document.getElementById('rules')
const quizContainer = document.getElementById('quiz')
const buttonContainer = document.getElementById('button-ctn')
const hideButton = document.getElementById('rules-btn')
const headNumber = document.getElementById('number')
const questionText = document.getElementById('question')
const nextButton = document.getElementById('next')
const timer = document.getElementById('timer')
const scoreText = document.getElementById('score-text')
const playAgainButton = document.getElementById('play-again')
const scoreContainer = document.getElementById('score-ctn')

const questions = [
    {
        question: "Which language has more native speakers",
        answers: [
            { text: "Spanish", correct: "true"},
            { text: "English", correct: "false" },
            { text: "German", correct: "false" },
            { text: "Italian", correct: "false" }
        ]
    },
    {
        question: "What artist has the most streams on spotify",
        answers: [
            { text: "Kanye", correct: "false" },
            { text: "Lil Wayne", correct: "false" },
            { text: "Drake", correct: "true" },
            { text: "Eminem", correct: "false" }
        ]
    },
    {
        question: "How many elements are in the periodic table",
        answers: [
            { text: "108", correct: "false" },
            { text: "129", correct: "false" },
            { text: "119", correct: "true" },
            { text: "206", correct: "false" }
        ]
    },
    {
        question: "What country as won the most world cups",
        answers: [
            { text: "USA", correct: "false" },
            { text: "Brazil", correct: "true" },
            { text: "Spain", correct: "false" },
            { text: "Argentina", correct: "false" }
        ]
    },
    {
        question: "In what country would you find Mount Kilimanjaro",
        answers: [
            { text: "Nigeria", correct: "false" },
            { text: "Algeria", correct: "false" },
            { text: "South Africa", correct: "false" },
            { text: "Tanzania", correct: "true" }
        ]
    },
    {
        question: "What planet is closest to the sun",
        answers: [
            { text: "Mercury", correct: "true" },
            { text: "Earth", correct: "false" },
            { text: "Venus", correct: "false" },
            { text: "Jupiter", correct: "false" }
        ]
    },
    {
        question: "What was the first name of Argentinian soccer star Maradona",
        answers: [
            { text: "Roberto", correct: "false" },
            { text: "Alvarez", correct: "false" },
            { text: "Diego", correct: "true" },
            { text: "Paulo", correct: "false" }
        ]
    },
    {
        question: "What is the smallest planet in our system",
        answers: [
            { text: "Venus", correct: "false" },
            { text: "Saturn", correct: "false" },
            { text: "Earth", correct: "false" },
            { text: "Mercury", correct: "true" }
        ]
    },
    {
        question: "What are the five colors of the olympic rings",
        answers: [
            { text: "Red, Yellow, Orange, Purple and Black", correct: "false" },
            { text: "Red, Yellow, Black, Green and Blue", correct: "true" },
            { text: "Green, Orange, Violet, Indigo and Cyan", correct: "false" },
            { text: "Grey, White, Blue, Yellow and Red", correct: "false" }
        ]
    },
    {
        question: "What language is spoken in Brazil",
        answers: [
            { text: "Italian", correct: "false" },
            { text: "Spanish", correct: "false" },
            { text: "Portugese", correct: "true" },
            { text: "French", correct: "false" }
        ]
    }
]

nextButton.disabled = true

function hideRules() {
    rulesContainer.style.display = 'none'
    quizContainer.style.display = 'block'

    //clearInterval(countdownInterval)
    countDownTimer()
}

hideButton.addEventListener('click', hideRules)

function startQuiz() {
    currentQuestionIndex = 0
    score = 0

    buttonContainer.innerHTML = ''

    //clearInterval(countdownInterval)
    showQuestion()
}

startQuiz()

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1

    headNumber.innerHTML = "Question " + questionNo
    questionText.innerHTML = currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const answerButton = document.createElement('button')
        answerButton.dataset.id = answer.correct
        answerButton.innerHTML = answer.text
        answerButton.classList.add('btn')

        buttonContainer.appendChild(answerButton)

        answerButton.addEventListener('click', () => {
            if(answer.correct === 'true') {
                answerButton.classList.add('correct')

                const options = quizContainer.querySelectorAll('.btn')

                options.forEach(option => {
                    option.disabled = true
                })

                score++

                nextButton.disabled = false

                //console.log(score)
            } else if(answer.correct === "false") { 
                answerButton.classList.add('wrong')

                const options = quizContainer.querySelectorAll('.btn')

                options.forEach(option => {
                    option.disabled = true
                })

                const buttons = quizContainer.querySelectorAll('.btn')

                buttons.forEach(button => {
                    const dataId = button.dataset.id

                    if(dataId === 'true') {
                        button.classList.add('correct')
                        //console.log(button)
                    }
                    //console.log(dataId)
                })

                nextButton.disabled = false
            }
        })
    })
     
    //nextQuestion()
}

/*function nextQuestion() {
    nextButton.addEventListener('click', () => { 
        buttonContainer.innerHTML = ''
        //currentQuestionIndex++

        console.log(currentQuestionIndex)

        if(currentQuestionIndex < questions.length) {

            if (countdownInterval) {
                clearInterval(countdownInterval);
                countDownTimer()
            }
            
            showQuestion()
            //showNextQuestion()
        } else {
            showScore()
            //startQuiz()
        }

        nextButton.disabled = true
    })
}*/

function showNextQuestion() {
    currentQuestionIndex++  

    if(currentQuestionIndex < questions.length) {
        buttonContainer.innerHTML = ''
        showQuestion()
        clearInterval(countdownInterval);
        countDownTimer()
    } else {
        nextButton.disabled = false
        //nextButton.innerHTML = 'Submit'

        showScore()
    }

    console.log(currentQuestionIndex)
}

nextButton.addEventListener('click', showNextQuestion)

function countDownTimer() {
    nextButton.disabled = true
    var countDown = Date.now() + 15000;

    function updateTimer() {
        var now = new Date().getTime();
        var distance = countDown - now;
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (seconds <= 0) {
            clearInterval(countdownInterval);
            //console.log('i love anime');
            showNextQuestion()
        }
        timer.innerHTML = seconds;
        //console.log(seconds);
    }

    updateTimer();

    countdownInterval = setInterval(updateTimer, 500);
}

function showScore() {
    quizContainer.style.display = 'none' 
    scoreContainer.style.display = 'block'
    scoreText.innerHTML = score + ' out of 10'  
}

playAgainButton.addEventListener('click', startAgain)

function startAgain() {
    rulesContainer.style.display = 'block'
    scoreContainer.style.display = 'none'

    clearInterval(countdownInterval)

    startQuiz()
}
