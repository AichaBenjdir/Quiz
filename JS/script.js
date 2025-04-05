const quiz = new Quiz(questions);

// Événement du bouton de démarrage
document.querySelector(".btn-start").addEventListener("click", () => {
    document.querySelector(".quiz-box").classList.add("active");
    showQuestion(quiz.callQuestion());
    showNumber(quiz.questionIndex + 1, quiz.questions.length);
    startTimer(10);
    startLine();
});

// Événement du bouton suivant
document.querySelector(".next").addEventListener("click", () => {
    if (quiz.questions.length > quiz.questionIndex + 1) {
        document.querySelector(".quiz-box").classList.add("active");
        clearInterval(counter);
        startTimer(10);
        clearInterval(counterLine);
        startLine();
        quiz.questionIndex++;
        showQuestion(quiz.callQuestion());
        showNumber(quiz.questionIndex + 1, quiz.questions.length);
    } else {
        console.log("Fin du Quiz");
        clearInterval(counter);
        clearInterval(counterLine);
        document.querySelector(".quiz-box").classList.remove("active");
        document.querySelector(".score-box").classList.add("active");
        showScore(quiz.correctAnswers, quiz.questions.length);
    }
});

// Événement du bouton Rejouer
document.querySelector(".replay-btn").addEventListener("click", () => {
    quiz.questionIndex = 0;
    quiz.correctAnswers = 0;
    document.querySelector(".btn-start").click();
    document.querySelector(".score-box").classList.remove("active");
});

// Événement du bouton Quitter
document.querySelector(".quit-btn").addEventListener("click", () => {
    window.location.reload();
});

const option_list = document.querySelector(".option-list");
const correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>';
const incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>';

// Fonction pour afficher les questions
function showQuestion(question) {
    let question_text = `<span> ${question.questionText} </span> `;
    let options = '';

    for (let answer in question.answers) {
        options +=
            `
            <div class="option">
                <span><b>${answer}</b>: ${question.answers[answer]}</span>
            </div>
        `;
    }

    document.querySelector(".question-text").innerHTML = question_text;
    option_list.innerHTML = options;

    const option = option_list.querySelectorAll(".option");

    for (opt of option) {
        opt.setAttribute("onclick", "optionSelected(this)");
    }
}

// Fonction pour les options
function optionSelected(option) {
    clearInterval(counter);
    clearInterval(counterLine);
    let answer = option.querySelector("span b").textContent;
    let question = quiz.callQuestion();

    if (question.checkAnswer(answer)) {
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", correctIcon);
        quiz.correctAnswers++;
    } else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", incorrectIcon);
    }

    for (let i = 0; i < option_list.children.length; i++) {
        option_list.children[i].classList.add("disabled");
    }
}

// Fonction pour afficher le numéro de la question
function showNumber(questionNumber, allQuestions) {
    let tag = `<span>${questionNumber} / ${allQuestions}</span>`;
    document.querySelector(".badge").innerHTML = tag;
}

// Fonction pour afficher le score
function showScore(correctAnswers, allQuestions) {
    let tag = `Vous avez ${correctAnswers} bonnes réponses sur ${allQuestions}`;
    document.querySelector(".score-text").innerHTML = tag;
}

// Timer
let counter;

function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        document.querySelector(".second").textContent = time;
        time--;

        if (time < 0) {
            clearInterval(counter);

            document.querySelector(".time-text").textContent = "Temps écoulé";

            let answer = quiz.callQuestion().correctAnswer;

            for (let option of option_list.children) {
                if (option.querySelector("span b").textContent == answer) {
                    option.classList.add("correct");
                    option.insertAdjacentHTML("beforeend", correctIcon);
                }
                option.classList.add("disabled");
            }
        }
    }
}

// Time Line
let counterLine;

function startLine() {
    counterLine = setInterval(timer, 20);
    let lineWidth = 0;

    function timer() {
        document.querySelector(".time-line").style.width = lineWidth + "%";
        lineWidth += 0.181;

        if (lineWidth > 100.1) {
            clearInterval(counterLine);
        }
    }
}
