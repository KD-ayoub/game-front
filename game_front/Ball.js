export default class Ball {
    constructor(context, data) {
        this.context = context;
        this.radius = data.radius;
        this.color = data.color;
        this.speed = data.speed;
        this.tableWidth = 600;
        this.tableHeight = 800;
        //direction to start
        this.reset();
    }

    checkAngle(angle) {
        if ((angle >= 0 && angle <= 25) ||
            (angle >= 80 && angle <= 100) ||
            (angle >= 155 && angle <= 205) ||
            (angle >= 260 && angle <= 290) ||
            (angle >= 335 && angle <= 360)
        )
            return false;
        return true;
    }

    randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    drawBall() {
        this.circle = new Path2D();
        this.circle.arc(this.xpos, this.ypos, this.radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = this.color;
        this.context.fill(this.circle);
    }

    reset() {
        this.xpos = this.tableWidth / 2;
        this.ypos = this.tableHeight / 2;
        let sight = 0;
        while (!this.checkAngle(sight * 180 / Math.PI)) {
            sight = this.randomNumber(0, 2 * Math.PI);
            console.log(sight * 180 / Math.PI);
        }
        this.direction = {
            x: Math.cos(sight),
            y: Math.sin(sight)
        };
        this.dx = this.direction.x * this.speed;
        this.dy = this.direction.y * this.speed;
    }

    checkLoss() {
        if ((this.ypos + this.radius) > (this.tableHeight - 5) ||
            (this.ypos - this.radius) < 5)
            return true;
        return false;
    }

    updateBall(delta, data) {
        this.context.clearRect(0, 0, this.tableWidth, this.tableHeight);
        this.drawBall();
        if ((this.xpos + this.radius) >= this.tableWidth)
            this.dx = -this.dx;
        if ((this.xpos - this.radius) <= 0)
            this.dx = -this.dx;
        if ((this.ypos + this.radius) >= this.tableHeight)
            this.dy = -this.dy;
        if ((this.ypos - this.radius) <= 0)
            this.dy = -this.dy;
        //touch the paddle

        if (((data.yUp + data.height) >= (this.ypos - this.radius)) &&
            (((this.xpos - this.radius) >= data.xUp &&
                (this.xpos - this.radius) <= (data.xUp + data.width)) ||
                ((this.xpos + this.radius) >= data.xUp &&
                    (this.xpos + this.radius) <= (data.xUp + data.width)))) {
            this.dy = -this.dy;
            console.log('cool 1');
        }

        if ((data.yDown <= (this.ypos + this.radius)) &&
            (((this.xpos - this.radius) >= data.xDown &&
                (this.xpos - this.radius) <= (data.xDown + data.width)) ||
                ((this.xpos + this.radius) >= data.xDown &&
                    (this.xpos + this.radius) <= (data.xDown + data.width)))) {
            this.dy = -this.dy;
            console.log('cool 2');
        }
        //touch the paddle side
        //if ((data.yDown <= (this.ypos + this.radius)) &&
        //    ((this.xpos - this.radius) <= (data.xDown + data.width) ||
        //    (this.xpos + this.radius) >= data.xDown)) {

        //if ((data.yDown <= (this.ypos + this.radius)) &&
        //    (this.xpos - this.radius) <= (data.xDown + data.width)) {
        //    this.dx = -this.dx;
        //    console.log('cool 3');
        //}

        this.xpos += this.dx * delta;
        this.ypos += this.dy * delta;
    }

    get x() {
        return this.xpos;
    }

    get y() {
        return this.ypos;
    }
}
