const Questions = [
    {
    question: "Computer system is divided into how many numbers of components?",
    answers: [
        { text: "One", correct: false },
        { text: "Two", correct: false },
        { text: "Three", correct: false },
        { text: "Four", correct: true }
    ]
},
{
    question: "What is the name of the operating system that reads and reacts in terms of actual time?",
    answers: [
        { text: "Real time system", correct: true },
        { text: "Time sharing system", correct: false },
        { text: "Quick response system", correct: false },
        { text: "Batch system", correct: false }
    ]
},
{
    question: "Which of the following software is used to simplify using of system software?",
    answers: [
        { text: "Time sharing system", correct: false },
        { text: "Multi-tasking system", correct: false },
        { text: "Operating environment", correct: true },
        { text: "Spreadsheet", correct: false }
    ]
},
{
    question: "UNIX operating system",
    answers: [
        { text: "Can run along PC’s and larger system", correct: false },
        { text: "Is multitasking", correct: false },
        { text: "Is multiuser", correct: false },
        { text: "All of these", correct: true }
    ]
},
{
    question: "Express the statement in propositional formula, 'The campus server does not work if the internet is off.'",
    answers: [
        { text: "p ∨ q", correct: false },
        { text: "p → q", correct: false },
        { text: "¬p ∨ ¬q", correct: false },
        { text: "¬p → ¬q", correct: true }
    ]
},
{
    question: "Let the domain of x be all plants and animals. Which of the following is true if:\nB(x) = 'x is a bird'\nE(x) = 'x lays eggs'\nM(x) = 'x is a mammal'\nP(x) = 'x is a plant'\nW(x) = 'x inhabits water'",
    answers: [
        { text: "∀x (E(x) → B(x))", correct: false },
        { text: "∃x (W(x) ∧ ¬P(x))", correct: true },
        { text: "∃x (W(x) ∧ P(x))", correct: false },
        { text: "∀x (W(x) ∧ ¬M(x))", correct: false }
    ]
},
{
    question: "Express the statement in predicate logic, 'There is someone who is loved by everyone.'\nLet L(x,y) = 'x loves y'",
    answers: [
        { text: "∀x ∀x", correct: false },
        { text: "∃x ∃x", correct: false },
        { text: "∀x ∃x", correct: false },
        { text: "∃x ∀x", correct: true }
    ]
},
{
    question: "Let A = {0,2,5,6,7} and let B = {1,2,3,4,6}. Which of the given relations have the set {(2,2), (6,6)}?",
    answers: [
        { text: "R = {(a,b) ∈ A×B | a = b}", correct: true },
        { text: "R = {(a,b) ∈ A×B | a < b}", correct: false },
        { text: "R = {(a,b) ∈ A×B | a > b}", correct: false },
        { text: "R = {(a,b) ∈ A×B | a ≠ b}", correct: false }
    ]
}
];

const questionElement = document.querySelector(".Questions"); 
const answerButtonsElement = document.getElementById("buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion(); 
}

function showQuestion() {
    resetState();

    let currentQuestion = Questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonsElement.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", () => selectAnswer(button, answer));
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(button, answer) {
    const isCorrect = answer.correct;
    if (isCorrect) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("incorrect");
    }
    Array.from(answerButtonsElement.children).forEach(btn => {
        if (btn.dataset.correct === "true") {
            btn.classList.add("correct");
        }
        btn.disabled = true;
    }); 
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${Questions.length}`;
    nextButton.innerHTML = "Restart Quiz";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < Questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < Questions.length) {
       handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
