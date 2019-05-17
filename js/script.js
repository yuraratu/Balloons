let colors = ['yellow', 'red', 'blue', 'violet', 'green'];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll('.score');
let num = 0;
let timeoutFrom = 500;
let timeoutTo = 1400;
let total = 100;
let currentBalloon = 0;
let gameOver = false;
let totalShadow = document.querySelector('.total-shadow');

function createBalloon() {
    let div = document.createElement('div');
    let rand = Math.floor(Math.random() * colors.length);
    div.className = 'balloon balloon-' + colors[rand];

    rand = Math.floor(Math.random() * (windowWidth - 100));
    div.style.left = rand + "px";
    div.dataset.number = currentBalloon;
    currentBalloon++;

    body.appendChild(div);
    animateBalloon(div);
}

function animateBalloon(elem) {
    let pos = 0;
    let random = Math.floor(Math.random() * 6 - 3);
    let interval = setInterval(frame, 12 - Math.floor(num / 5) + random);

    function frame() {
        if (pos >= (windowHeight + 200) && (document.querySelector('[data-number="'+elem.dataset.number+'"]') !== null)) {
            clearInterval(interval);
            deleteBalloon(elem);
            gameOver = true;
        }else {
            pos++;
            elem.style.top = windowHeight - pos + "px";
        }
    }
}

function deleteBalloon(elem) {
    elem.remove();
}

function playBallSound() {
    audio = document.createElement('audio');
    audio.src = 'sounds/pop.mp3';
    audio.play();
}

function updateScore() {
    scores.forEach(element => {
        element.textContent = num;
    });
}

function startGame(){
	restartGame();
	let timeout = 0;

	let loop = setInterval(function(){
		timeout = Math.floor(Math.random() * 600 - 100);
		if(!gameOver && num !== total){
			createBalloon();
		} else if(num !== total) {
			clearInterval(loop);
			totalShadow.style.display = 'flex';
			totalShadow.querySelector('.lose').style.display = 'block';
		} else {
			clearInterval(loop);
			totalShadow.style.display = 'flex';
			totalShadow.querySelector('.win').style.display = 'block';
		}
		
	}, 1200 + timeout);
}

function restartGame() {
    let forRemoving = document.querySelectorAll('.balloon')
    forRemoving.forEach(element => {
        element.remove();
    });
    gameOver = false;
    num = 0;
    updateScore();
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('balloon')) {
        deleteBalloon(event.target);
        num++;
        updateScore();
        playBallSound();
    }
})

document.querySelector('.win-restart').addEventListener('click', function () {
    totalShadow.style.display = 'none';
    totalShadow.querySelector('.win').style.display = 'none';
    totalShadow.querySelector('.lose').style.display = 'none';
    startGame();
})

// document.querySelector('.win-cancel').addEventListener('click', function () {
//     totalShadow.style.display = 'none';
// })

document.querySelector('.lose-restart').addEventListener('click', function () {
    totalShadow.style.display = 'none';
    totalShadow.querySelector('.win').style.display = 'none';
    totalShadow.querySelector('.lose').style.display = 'none';
    startGame();
})

// document.querySelector('.lose-cancel').addEventListener('click', function () {
//     totalShadow.style.display = 'none';
// })


startGame();
;