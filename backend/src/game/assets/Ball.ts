import { Server, Socket } from 'socket.io';

export class Ball {
  private radius: number;
  private speed: number;
  private tableWidth: number;
  private tableHeight: number;
  private xpos: number;
  private ypos: number;
  private dx: number;
  private dy: number;
  private gap: number;

	constructor(data: any) {
    this.radius = data.tableWidth / 30;
    this.speed = (data.tableWidth < 400) ? 0.2 : 0.3;
    this.gap = data.tableWidth < 400 ? 3 : 5;
    this.tableWidth = data.tableWidth;
    this.tableHeight = data.tableHeight;
    this.xpos = data.tableWidth / 2;
    this.ypos = data.tableHeight / 2;
    //let sight = 0;
    //while (!this.checkAngle((sight * 180) / Math.PI))
    //  sight = this.randomNumber(0, 2 * Math.PI);
    //const direction = {
    //  x: Math.cos(sight),
    //  y: Math.sin(sight),
    //};
    //this.dx = direction.x * this.speed;
    //this.dy = direction.y * this.speed;
	}

  checkBallTouchPaddle(data: any, chk: boolean) {
    if (
      data.yUp + data.height >= this.ypos - this.radius &&
      ((this.xpos - this.radius >= data.xUp &&
        this.xpos - this.radius <= data.xUp + data.width) ||
        (this.xpos + this.radius >= data.xUp &&
          this.xpos + this.radius <= data.xUp + data.width))
    ) {
      if (chk) this.dy = -this.dy;
      return true;
    }
    if (
      data.yDown <= this.ypos + this.radius &&
      ((this.xpos - this.radius >= data.xDown &&
        this.xpos - this.radius <= data.xDown + data.width) ||
        (this.xpos + this.radius >= data.xDown &&
          this.xpos + this.radius <= data.xDown + data.width))
    ) {
      if (chk) this.dy = -this.dy;
      return true;
    }
    return false;
  }

  //updateBall(delta: number) {
  updateBall(delta: number, data: any) {
    if (this.xpos + this.radius >= this.tableWidth) this.dx = -this.dx;
    else if (this.xpos - this.radius <= 0) this.dx = -this.dx;
    else if (this.ypos + this.radius >= this.tableHeight) this.dy = -this.dy;
    else if (this.ypos - this.radius <= 0) this.dy = -this.dy;
    //touch the paddle
    this.checkBallTouchPaddle(data, true);

    this.xpos += this.dx * delta;
    this.ypos += this.dy * delta;
  }

  getData(client: string) {
    return {
      socket: client,
      radius: this.radius,
      speed: this.speed,
      xpos: this.xpos,
      ypos: this.ypos,
      dx: this.dx,
      dy: this.dy
    };
  }

  calculeBallSight() {
    let sight = 0;
    while (!this.checkAngle((sight * 180) / Math.PI))
      sight = this.randomNumber(0, 2 * Math.PI);
    return {
      xDirection: Math.cos(sight),
      yDirection: Math.sin(sight),
    };
  }

  setBallSight({xDirection, yDirection}) {
    this.dx = xDirection * this.speed;
    this.dy = yDirection * this.speed;
  }

  checkAngle(angle: number) {
    if (
      (angle >= 0 && angle <= 25) ||
      (angle >= 80 && angle <= 100) ||
      (angle >= 155 && angle <= 205) ||
      (angle >= 260 && angle <= 290) ||
      (angle >= 335 && angle <= 360)
    )
      return false;
    return true;
  }

  randomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
