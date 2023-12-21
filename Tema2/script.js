let questions = [
    { id: 1, question: "What is the capital of Romania?", choices: ["Cluj", "Bucharest", "Alba Iulia", "Brasov"], correctAnswer: 1 },
    { id: 2, question: "Zoophobia is the fear of what?", choices: ["Zoo", "Fast speeds", "Animals", "People"], correctAnswer: 2 },
    { id: 3, question: "Who won a Grammy Award for her song 'Killing Me Softly'?", choices: ["Roberta Flack", "Frank Sinatra", "Dean Martin", "Gloria Gaynor"], correctAnswer: 0 }
    // Add more questions similarly
];

let answeredQuestions = [];


let userScore = 0;

function generateQuestion() {
    if (answeredQuestions.length === questions.length) {
        displayScore();
    } else {
        let nextQuestion = getRandomUnansweredQuestion();
        displayQuestion(nextQuestion);
    }
}

function checkAnswer() {
    let selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert("Please select an option!");
        return;
    }

    let currentQuestion = questions.find(q => q.id === parseInt(document.getElementById("questionId").innerText));
    if (selectedOption.value === currentQuestion.choices[currentQuestion.correctAnswer]) {
        userScore++;
    }
    answeredQuestions.push(currentQuestion);
    generateQuestion();
}

function getRandomUnansweredQuestion() {
    let unansweredQuestions = questions.filter(q => !answeredQuestions.includes(q));
    return unansweredQuestions[Math.floor(Math.random() * unansweredQuestions.length)];
}

function displayQuestion(question) {
    document.getElementById("questionId").innerText = question.id;
    document.getElementById("questionText").innerText = question.question;
    let optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    question.choices.forEach((choice, index) => {
        let option = document.createElement("input");
        option.setAttribute("type", "radio");
        option.setAttribute("name", "option");
        option.setAttribute("value", choice);
        option.setAttribute("id", `option${index}`);
        let label = document.createElement("label");
        label.setAttribute("for", `option${index}`);
        label.textContent = choice;
        optionsContainer.appendChild(option);
        optionsContainer.appendChild(label);
    });
}

function displayScore() {
    document.getElementById("question-area").style.display = "none";
    document.getElementById("score-area").style.display = "block";
    document.getElementById("user-score").innerText = `Your score is: ${userScore}/${questions.length}`;
}


generateQuestion();

function tryAgain() {
    answeredQuestions = [];
    userScore = 0;
    document.getElementById("score-area").style.display = "none";
    document.getElementById("question-area").style.display = "block";
    generateQuestion();
}