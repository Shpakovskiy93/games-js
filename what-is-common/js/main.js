let questions = [
    {
        imgSrc: ['./img/level-1/level1-1.webp', './img/level-1/level1-2.jpg', './img/level-1/level1-3.jpeg'],
        answer: 'серый',
        help: ['серая статуя', 'Светлаков', 'волк']
    },
    {
        imgSrc: ['./img/level-2/level2-1.jpeg','./img/level-2/level2-2.jpeg','./img/level-2/level2-3.jpg'],
        answer: 'полиция',
        help: ['царь в египте', 'группа пород охотничьих собак', 'мусор']
    },
    {
        imgSrc: ['./img/level-3/level3-1.jpg','./img/level-3/level3-2.jpeg','./img/level-3/level3-3.jpg'],
        answer: 'знаки зодиака',
        help: ['имя', 'кто они', 'что делает']
    },
    {
        imgSrc: ['./img/level-4/level4-1.webp','./img/level-4/level4-2.jpeg','./img/level-4/level4-3.jpg'],
        answer: 'деньги',
        help: ['капуста', 'бабки', 'бобы']
    },
    {
        imgSrc: ['./img/level-5/level5-1.webp','./img/level-5/level5-2.webp','./img/level-5/level5-3.jpg'],
        answer: 'распалась',
        help: ['група', 'кокос', 'страна']
    },
]

function addCards(level, images) {
    if(level > questions.length - 1) {
        console.log('winner');
    } else {
        images.forEach((element, index) => {
            element.src = questions[level].imgSrc[index];
        })
    }
}
function checkAnswer(value, answer) {
    if(value === answer) {
        return true
    } else {
        return false
    }
}

function main() {
    let level = 0;
    let life = 5;
    let money = 0;

    const inputEl = document.querySelector('.game__input');
    const btnEl = document.querySelector('.game__btn');
    const imgsEl = document.querySelectorAll('.cards__img');
    const gameLifeEl = document.querySelector('.game__life');
    const gameMoneyEl = document.querySelector('.game__money');
    const gameHelpBtnEl = document.querySelector('.game__help');
    const helpEl = document.querySelector('.help');
    const helpBtnEl = document.querySelector('.help__btn');
    const helpTitleEl = document.querySelectorAll('.help__title');
    gameLifeEl.innerHTML = life;
    gameMoneyEl.innerHTML = money;
    
    addCards(level, imgsEl);

    btnEl.addEventListener('click', (e) => {
        let flagAnswer = checkAnswer(inputEl.value, questions[level].answer);

        if(flagAnswer) {
            level++;
            money++;
            gameMoneyEl.innerHTML = money;
            if(life < 5) {
                life++;
                gameLifeEl.innerHTML = life;
            }
            addCards(level, imgsEl);
        } else {
            life--;
            gameLifeEl.innerHTML = life;
        }
    })

    gameHelpBtnEl.addEventListener('click', e => {
        helpTitleEl.forEach((element, index) => {
            element.innerHTML = questions[level].help[index];
        })
        helpEl.classList.remove('hide');
    })
    helpBtnEl.addEventListener('click', e => {
        helpEl.classList.add('hide');
    })

}
main();