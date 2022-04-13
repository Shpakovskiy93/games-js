window.addEventListener('load', () => {

    let countUser = document.querySelector('.counter__user');
    let countComputer = document.querySelector('.counter__computer');
    let userField = document.querySelector('.user__field');
    let computerField = document.querySelector('.computer__field');
    let sound = document.querySelector('.sound');
    let result = document.querySelector('.game__result');
    let playBtn = document.querySelector('.play');
    let fields = document.querySelectorAll('.field');

    let userStep;
    let userCount = 0;
    let computerStep;
    let computerCoun = 0;
    let blocked = false;

    function choiceUser(e) {
        if(blocked) return;

        let target = e.target;
        if(target.classList.contains('field')) {
            userStep = target.dataset.field;
            fields.forEach(item => item.classList.remove('active', 'error'));
            target.classList.add('active');
            choiceComputer();
        }
    }

    function choiceComputer() {
        blocked = true;
        let rand = Math.floor(Math.random() * 3);
        // computerField.classList.add('blink');
        let compFields = computerField.querySelectorAll('.field');

        setTimeout(() => {
            // computerField.classList.remove('blink');
            computerStep = compFields[rand].dataset.field;
            compFields[rand].classList.add('active');
            winner();
        },3000);
    }

    function winner() {
        blocked = false;
        let combinations = userStep + computerStep;

        switch (combinations) {
            case 'rockrock':
            case 'scissorsscissors':
            case 'paperpaper':
                result.innerText = 'Draw!';
                sound.setAttribute('src', 'audio/draw.mp3');
                sound.play();
            break;
            case 'rockscissors':
            case 'scissorspaper':
            case 'paperrock':
                result.innerText = 'WINN!';
                sound.setAttribute('src', 'audio/win.mp3');
                sound.play();
                userCount++;
                countUser.innerText = userCount;
                computerField.querySelector('[data-field = '+computerStep+']').classList.add('error');
            break;
            case 'rockpaper':
            case 'scissorrock':
            case 'paperscissor':
                result.innerText = 'LOST!';
                sound.setAttribute('src', 'audio/loss.mp3');
                sound.play();
                computerCoun++;
                countComputer.innerText = computerCoun;
                userField.querySelector('[data-field = '+userStep+']').classList.add('arror');
            break;
        }

    }

    function playGame() {
        userCount = computerCoun = 0;
        result.innerText = 'make a choice';
        countUser.innerText = '0';
        countComputer.innerText = '0';
        fields.forEach(item => item.classList.remove('active', 'error'));
    }

    playBtn.addEventListener('click', playGame);
    userField.addEventListener('click', choiceUser);

})