export default class Paddle {
    constructor(context, data) {
        this.context = context;
        this.color = data.color;
        this.speed = data.speed;
        this.tableWidth = 600;
        this.tableHeight = 800;
        this.paddleWidth = 170;
        this.paddleHeight = 20;
        this.paddleSpeed = 10;
        this.reset(data.x, data.y);
        this.chk =false;
    }

    get x() {
        return this.xpos;
    }

    get y() {
        return this.ypos;
    }

    checkRightWall() {
        if ((this.xpos + this.paddleWidth) >= this.tableWidth - 5)
            return true;
        return false;
    }

    checkLeftWall() {
        if ((this.xpos) <= 5)
            return true;
        return false;
    }

    movePaddle(key) {
        if (key === 'ArrowRight')
            this.xpos += this.paddleSpeed;
        else if (key === 'ArrowLeft')
            this.xpos -= this.paddleSpeed;
    }

    drawPaddle() {
        this.paddle = new Path2D();
        this.paddle.rect(this.xpos, this.ypos, this.paddleWidth, this.paddleHeight);
        this.context.fillStyle = this.color;
        this.context.fill(this.paddle);
    }

    reset(x, y) {
        this.xpos = x;
        this.ypos = y;
    }

    //expert level
    //updateBotPaddle(x) {
    //    if (!(x > this.tableWidth - (this.paddleWidth / 2) - 5) &&
    //        !(x < (this.paddleWidth / 2) + 5) &&
    //        (!this.checkRightWall() || !this.checkLeftWall()))
    //        this.xpos = x - (this.paddleWidth / 2);
    //    this.drawPaddle();
    //}

    updateBotPaddle(x) {
        if (!(x > this.tableWidth - (this.paddleWidth / 2) - 5) &&
            !(x < (this.paddleWidth / 2) + 5) &&
            (!this.checkRightWall() || !this.checkLeftWall())) {
            //if (x > this.tableWidth / 2)
            //    this.xpos += 5;
            //else
            //    this.xpos -= 5;
            if (this.chk) {
                this.xpos = x - (this.paddleWidth / 2);
                this.chk = false;
            }
            else
                this.chk = true;
        }


        this.drawPaddle();
    }

    updatePaddle() {
        this.drawPaddle();
    }
}
