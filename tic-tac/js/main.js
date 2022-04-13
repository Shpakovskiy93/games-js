let game = document.querySelector('.game');
let result = document.querySelector('.result');
let btn = document.querySelector('.new__game');
let fields = document.querySelectorAll('.field');

let step = false;
let count = 0;
let circle = `<svg class="circle">
                <circle r='45' cx='58' cy='58' stroke='blue'
                stroke-width='10' fill='none' stroke-linecap='round' />
</svg>`;
let cross = `<svg class="cross">
                <line class='first' x1='15' y1='15' x2='100' y2='100'stroke='red' stroke-width='10' stroke-linecap='round'/>
                <line class='second' x1='100' y1='15' x2='15' y2='100'stroke='red' stroke-width='10' stroke-linecap='round'/>
</svg>`;


function stepCross(target) {
    if(target.tagName == 'svg' || target.tagName == 'line' || target.tagName == 'circle') {
        return;
    }
    target.innerHTML = cross;
    target.classList.add('x');
    let crossAudio = new Audio('audio/cross.mp3');
    crossAudio.play();
    count++;
    step = true;
}
function stepCircle(target) {
    if(target.tagName == 'svg' || target.tagName == 'line' || target.tagName == 'circle') {
        return;
    }
    target.innerHTML = circle;
    target.classList.add('o');
    let circleAudio = new Audio('audio/zero.mp3');
    circleAudio.play();
    count++;
    step = false;
}

function init(e) {
    if(!step) stepCross(e.target);
    else stepCircle(e.target);
    win();
}

function newGame() {
    step = false;
    count = 0;
    result.innerText = 'tic-tac-toe';
    fields.forEach(item => {
        item.innerHTML = '';
        item.classList.remove('x', 'o', 'active');
    })
    game.addEventListener('click', init);
}

function win() {
    let winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for(let i = 0; i < winCombinations.length; i++) {
        if(fields[winCombinations[i][0]].classList.contains('x') &&
            fields[winCombinations[i][1]].classList.contains('x') &&
            fields[winCombinations[i][2]].classList.contains('x')) {
                setTimeout(() => {
                    fields[winCombinations[i][0]].classList.add('active');
                    fields[winCombinations[i][1]].classList.add('active');
                    fields[winCombinations[i][2]].classList.add('active');
                    result.innerText = `winn 'X'`;
                }, 1500)
                game.removeEventListener('click', init);
                return;
        }
        else if(fields[winCombinations[i][0]].classList.contains('o') &&
            fields[winCombinations[i][1]].classList.contains('o') &&
            fields[winCombinations[i][2]].classList.contains('o')) {
                setTimeout(() => {
                    fields[winCombinations[i][0]].classList.add('active');
                    fields[winCombinations[i][1]].classList.add('active');
                    fields[winCombinations[i][2]].classList.add('active');
                    result.innerText = `winn 'O'`;
                }, 1500)
                game.removeEventListener('click', init);
                return;
        }
    }
    if(count === 9) {
        result.innerText = 'draw';
        game.removeEventListener('click', init);
    }
}

btn.addEventListener('click', newGame);
game.addEventListener('click', init);