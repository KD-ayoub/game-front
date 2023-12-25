import Ball from './Ball.js';
import Paddle from './Paddle.js';

const table = document.getElementById('table');
table.width = 600;
table.height = 800;
table.style.background = "#000";

const context = table.getContext("2d");
const ball = new Ball(context, {
    radius: 18,
    speed: 0.30,
    color: '#fff'
});

const paddleWidth = 170;
const paddleHeight = 20;
const xdownPaddle = table.width - 170 - 5;
const ydownPaddle = table.height - 20 - 5;
const xupPaddle = 5;
const yupPaddle = 5;

const downPaddle = new Paddle(context, {
    x: xdownPaddle,
    y: ydownPaddle,
    speed: 0.40,
    color: '#fff'
});

const upPaddle = new Paddle(context, {
    x: xupPaddle,
    y: yupPaddle,
    speed: 0.40,
    color: '#fff'
});

//ball.drawBall();
//downPaddle.drawPaddle();

//window.onload = function() {
//    console.log('ana');
//}

const resetAll = function() {
    ball.reset();
    downPaddle.reset(xdownPaddle, ydownPaddle);
    upPaddle.reset(xupPaddle, yupPaddle); 
}

let lastTime;
function update(time) {
    if (lastTime) {
        const delta = time - lastTime;
        if (ball.checkLoss())
            resetAll();
        ball.updateBall(delta, {
            xDown: downPaddle.x,
            xUp: upPaddle.x,
            yDown: downPaddle.ypos,
            yUp: upPaddle.ypos,
            width: paddleWidth,
            height: paddleHeight
        });
        downPaddle.updatePaddle();
        //upPaddle.updatePaddle();

        upPaddle.updateBotPaddle(ball.x);
    }
    lastTime = time;
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);

document.addEventListener("keydown", (e) => {
    switch(e.code) {
        case 'ArrowRight':
            if (!downPaddle.checkRightWall())
                downPaddle.movePaddle(e.code);
            break ;
        case 'ArrowLeft':
            if (!downPaddle.checkLeftWall())
                downPaddle.movePaddle(e.code);
            break ;
    }
})
