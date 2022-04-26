const questions = [
    {
        imgSrc: ['./img/level-1/level1-1.jpg', './img/level-1/level1-2.jpg', './img/level-1/level1-3.jpeg'],
        answer: 'серый',
        help: ['статуя', 'Светлаков', 'волк']
    },
    {
        imgSrc: ['./img/level-2/level2-1.jpeg','./img/level-2/level2-2.jpeg','./img/level-2/level2-3.jpg'],
        answer: 'полиция',
        help: ['царь в египте', 'группа пород охотничьих собак', 'мусор']
    },
    {
        imgSrc: ['./img/level-3/level3-1.jpg','./img/level-3/level3-2.jpeg','./img/level-3/level3-3.jpg'],
        answer: 'знаки зодиака',
        help: ['его имя', 'кто они', 'что делает']
    },
    {
        imgSrc: ['./img/level-4/level4-1.webp','./img/level-4/level4-2.jpeg','./img/level-4/level4-3.jpg'],
        answer: 'деньги',
        help: ['капуста', 'бабки', 'бобы']
    },
    {
        imgSrc: ['./img/level-5/level5-1.webp','./img/level-5/level5-2.webp','./img/level-5/level5-3.jpg'],
        answer: 'распалась',
        help: ['музыкальная група', 'кокос', 'страна']
    },
    {
        imgSrc: ['./img/level-6/level6-1.jpeg','./img/level-6/level6-2.jpg','./img/level-6/level6-3.webp'],
        answer: 'напиться',
        help: ['стельки', 'дрова', 'попа']
    },
    {
        imgSrc: ['./img/level-7/level7-1.jpeg','./img/level-7/level7-2.jpg','./img/level-7/level7-3.jpeg'],
        answer: 'царь',
        help: ['михалков', 'лев', 'фильм']
    },
    {
        imgSrc: ['./img/level-8/level8-1.jpg','./img/level-8/level8-2.jpg','./img/level-8/level8-3.jpg'],
        answer: 'мать',
        help: ['Максим Горький', 'памятник Родина-мать', 'ударил по ноге']
    },
    {
        imgSrc: ['./img/level-9/level9-1.jpeg','./img/level-9/level9-2.jpg','./img/level-9/level9-3.jpg'],
        answer: 'деньги',
        help: ['успенский собор киево-печерской лавры', 'киево могилянская академия', 'украинская центральная рада']
    },
    {
        imgSrc: ['./img/level-10/level10-1.jpg','./img/level-10/level10-2.webp','./img/level-10/level10-3.jpg'],
        answer: 'окно',
        help: ['билл гейтс', 'петр первый', 'лошадь выглядывает ;)']
    },
    {
        imgSrc: ['./img/level-11/level11-1.jpeg','./img/level-11/level11-2.jpg','./img/level-11/level11-3.jpg'],
        answer: 'спокойной ночи малыши',
        help: ['собачка', 'свинка', 'оксана федорова']
    },
    {
        imgSrc: ['./img/level-12/level12-1.jpg','./img/level-12/level12-2.jpg','./img/level-12/level12-3.jpg'],
        answer: 'шахматы',
        help: ['королева англии', 'скачки', 'ладья']
    },
    {
        imgSrc: ['./img/level-13/level13-1.jpg','./img/level-13/level13-2.jpeg','./img/level-13/level13-3.jpg'],
        answer: 'органы',
        help: ['пирожное', 'почки на деревьях', 'дверной глазок']
    },
    {
        imgSrc: ['./img/level-14/level14-1.jpg','./img/level-14/level14-2.jpg','./img/level-14/level14-3.webp'],
        answer: 'бред',
        help: ['брэд питт', 'жириновский', 'nonsense']
    },
    {
        imgSrc: ['./img/level-15/level15-1.webp','./img/level-15/level15-2.jpg','./img/level-15/level15-3.webp'],
        answer: 'тряпка',
        help: ['корида', 'мужчина ?', 'арафатка']
    },
    {
        imgSrc: ['./img/level-16/level16-1.jpg','./img/level-16/level16-2.jpg','./img/level-16/level16-3.jpg'],
        answer: 'девушка',
        help: ['метелка', 'корова', 'цыпленок']
    },
    {
        imgSrc: ['./img/level-17/level17-1.jpeg','./img/level-17/level17-2.jpeg','./img/level-17/level17-3.jpg'],
        answer: 'ухо',
        help: ['тайсон и холифилд', 'вангог', 'пьер безухов']
    },
];

const inputEl = document.querySelector('.game__input');
const btnEl = document.querySelector('.game__btn');
const imgsEl = document.querySelectorAll('.cards__img');
const imgPromptsEl = document.querySelectorAll('.game__cards-prompt');
const gameLifeEl = document.querySelector('.game__life');
const gameMoneyEl = document.querySelector('.game__money');
const corectAnswerPopupEl = document.querySelector('.corect__answer');
const helpBtn = document.querySelector('.help');

function addCards(card) {
    imgsEl.forEach((img, index) => img.src = card.imgSrc[index]);
    imgPromptsEl.forEach((elem, index) => elem.innerHTML = card.help[index]);
}
function checkAnswer(card) {
    if(inputEl.value == card.answer) {
        return true;
    } else {
        return false;
    }
}
function showLife(life) {
    gameLifeEl.innerHTML = life;
}
function showMoney(money) {
    gameMoneyEl.innerHTML = money;
}
function generateRandomCard() {
    let numCard = Math.round((questions.length -1) * Math.random())
    let card = questions[numCard]
    questions.splice(numCard, 1);

    return card;
}

function game() {
    let level = 0;
    let life = 5;
    let money = 5;
    let card = generateRandomCard();

    addCards(card);
    showLife(life);
    showMoney(money);

    btnEl.addEventListener('click', () => {
        if(checkAnswer(card) && questions.length > 0) {
            money++;
            if(life < 5) life++;
            showLife(life);
            showMoney(money);
            card = generateRandomCard();
            corectAnswerPopupEl.classList.add('corect__answer-hide');
            setTimeout(() => {
                addCards(card);
                corectAnswerPopupEl.classList.remove('corect__answer-hide');
            },1000);
            inputEl.value = '';
        } else if(checkAnswer(card) && questions.length == 0) {
            alert('win')
            inputEl.value = '';
        } else if(!checkAnswer(card)) {
            if(life > 0) life--;
            showLife(life);
            inputEl.value = '';
        }
    })
}
game();