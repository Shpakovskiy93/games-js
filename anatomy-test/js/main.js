import { questions } from "./questions.js";

const questionEl = document.querySelector('.test__question-text');
const questionImgEl = document.querySelector('.test__question-img');
const answerOptionsEl = document.querySelectorAll('.anser');
const btnEl = document.querySelector('.btn');
//modal wrong anser
const wrongAnser = document.querySelector('.wrong__anser');
const wrongAnserSubtileEl = document.querySelector('.wrong__anser-subtitle');
const wrongAnserDescriptionEl = document.querySelector('.wrong__anser-description');
const wrongBtnEl = document.querySelector('.wrong__anser-btn');
//modal finh
const finshModalEl = document.querySelector('.finsh');
const finishRightAnserEl = document.querySelector('.finish__right-anser');
const finishWrongAnserEl = document.querySelector('.finish__wrong-anser');
const finishDescriptionEl = document.querySelector('.finish__description');
const finishBtnEl = document.querySelector('.finish__btn');

let questionNumber = 0;
let userAnser = [];

// show modal wrong anser
function showWrongAnser() {
    wrongAnserSubtileEl.innerHTML = `правильный ответ: ${questions[questionNumber].anser}`;
    wrongAnserDescriptionEl.innerHTML = questions[questionNumber].description;
    wrongAnser.classList.add('show');
    wrongBtnEl.addEventListener('click', () => wrongAnser.classList.remove('show'));
};

//create question card
function createCard(questionNumber) {
    //show question
    questionEl.innerHTML = questions[questionNumber].question;
    //show image
    questionImgEl.src = questions[questionNumber].img[0];
    //show answer options
    answerOptionsEl.forEach((elem, index) => {
        elem.innerHTML = questions[questionNumber].options[index];
    });
};
//choice user anser
function choiceAnswer() {
    //add listener click
    answerOptionsEl.forEach(elem => {
        elem.addEventListener('click', () => {
            answerOptionsEl.forEach(e => e.classList.remove('anser__active'));
            elem.classList.add('anser__active');
            // remove disabled for button
            btnEl.classList.remove('disabled');
            btnEl.classList.add('btn-hover');
            btnEl.disabled = false
        })
    })
};
//check user anser
function checkAnswer() {
    let answerOption;
    answerOptionsEl.forEach(elem => {
        if(elem.classList.contains('anser__active')) {
            answerOption = elem.innerHTML;
        }
    })

    if(answerOption == questions[questionNumber].anser) {
        userAnser[questionNumber] = answerOption;
        questionNumber++;
        answerOptionsEl.forEach(e => e.classList.remove('anser__active'));
        //add disabled btn
        btnEl.classList.add('disabled');
        btnEl.classList.remove('btn-hover');
        btnEl.disabled = true;
        test();
    } else {
        userAnser[questionNumber] = answerOption;
        showWrongAnser();
        questionNumber++;
        answerOptionsEl.forEach(e => e.classList.remove('anser__active'));
        //remove disabled btn
        btnEl.classList.add('disabled');
        btnEl.classList.remove('btn-hover');
        btnEl.disabled = true;
        test();
    }
}
//calculate percentages
function getProcent(rightAnser) {
    let procent = (rightAnser / questions.length) * 100;
    return procent;
}
//show finish modal
function showFinishModal(rightAnser,wrongAnser) {
    finishRightAnserEl.innerHTML = `правильных ответов ${rightAnser}`;
    finishWrongAnserEl.innerHTML = `непраильных ответов ${wrongAnser}`;
    finishDescriptionEl.innerHTML = `вы ответили на ${getProcent(rightAnser)}% вопросов`;
    finshModalEl.classList.add('show');
    finishBtnEl.addEventListener('click', () => {
        finshModalEl.classList.remove('show');
        questionNumber = 0;
        test();
    })
};
//comparisons ansers
function answerComparisons() {
    let right = 0;
    let wrong = 0;
    userAnser.forEach((anser, index) => {
        if(anser == questions[index].anser) {
            right++;
        } else {
            wrong++;
        }
    })
    showFinishModal(right, wrong);
}
//start test
function test() {
    if(questionNumber == questions.length) {
        answerComparisons()
    } else {
        createCard(questionNumber);
        choiceAnswer();
        btnEl.addEventListener('click', checkAnswer);
    }
}
test();