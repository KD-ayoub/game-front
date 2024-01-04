import { Server, Socket } from 'socket.io';

const INITIAL_VELOCITY: number = 0.1,
  VELOCITY_INCREASE: number = 0.3;

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
  private ballWidth: number;
  private ballHeight: number;
  private delta: number = 0;

	constructor(data: any) {
    //this.radius = data.tableWidth / 30;
    this.ballWidth = data.ballWidth;
    this.ballHeight = data.ballHeight;
    console.log('ballWidth ', this.ballWidth);
    console.log('ballHeight ', this.ballHeight);
    this.speed = INITIAL_VELOCITY;
    this.radius = this.ballWidth / 2;
    //this.gap = data.tableWidth < 400 ? 3 : 5;
    this.tableWidth = 100;
    this.tableHeight = 100;
    this.xpos = this.tableWidth / 2;
    this.ypos = this.tableHeight / 2;
    
    
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
    //if (
    //  data.yUp + data.height >= this.ypos - this.radius &&
    //  ((this.xpos - this.radius >= data.xUp &&
    //    this.xpos - this.radius <= data.xUp + data.width) ||
    //    (this.xpos + this.radius >= data.xUp &&
    //      this.xpos + this.radius <= data.xUp + data.width))
    //) {
    //  if (chk) this.dy = -this.dy;
    //  return true;
    //}
    //if (
    //  data.yDown <= this.ypos + this.radius &&
    //  ((this.xpos - this.radius >= data.xDown &&
    //    this.xpos - this.radius <= data.xDown + data.width) ||
    //    (this.xpos + this.radius >= data.xDown &&
    //      this.xpos + this.radius <= data.xDown + data.width))
    //) {
    //  if (chk) this.dy = -this.dy;
    //  return true;
    //}
    //return false;



    //if (
    //  data.yUp + data.height >= this.ypos - this.radius &&
    //  ((this.xpos - this.radius >= data.xUp &&
    //    this.xpos - this.radius <= data.xUp + data.width) ||
    //    (this.xpos + this.radius >= data.xUp &&
    //      this.xpos + this.radius <= data.xUp + data.width))
    //) 
    if (this.ypos <= 5 &&
        (((this.xpos - 3 >= data.upPos - 15) &&
          (this.xpos - 3 <= data.upPos + 15)) ||
            ((this.xpos + 3 >= data.upPos - 15) &&
             (this.xpos + 3 <= data.upPos + 15))))
    {
      if (chk) this.dy = -this.dy;
      return true;
    }
    //if (
    //  data.yDown <= this.ypos + this.radius &&
    //  ((this.xpos - this.radius >= data.xDown &&
    //    this.xpos - this.radius <= data.xDown + data.width) ||
    //    (this.xpos + this.radius >= data.xDown &&
    //      this.xpos + this.radius <= data.xDown + data.width))
    //)
    //if (this.ypos >= 95)
    if (this.ypos >= 95 &&
        (((this.xpos - 3 >= data.downPos - 15) &&
          (this.xpos - 3 <= data.downPos + 15)) ||
            ((this.xpos + 3 >= data.downPos - 15) &&
             (this.xpos + 3 <= data.downPos + 15))))
    {
      if (chk) this.dy = -this.dy;
      return true;
    }
    return false;

  }

  checkLoss(data: any) {
    //if ((this.ypos + this.radius) > (this.tableHeight - this.gap) ||
    //    (this.ypos - this.radius) < this.gap)`j
    //if (!this.checkBallTouchPaddle(data, false) &&
    //    (((this.ypos - this.radius) < (data.yUp + data.height)) ||
    //     ((this.ypos + this.radius) > data.yDown)))
    if (!this.checkBallTouchPaddle(data, false) &&
        (((this.ypos) < 5) ||
         ((this.ypos) > 95)))
      return true;
    return false;
  }

  //updateBall(delta: number) {
  updateBall(delta: number, data: any) {
    // if ((this.xpos - this.ballWidth/2 <= 0) || this.xpos + this.ballWidth/2 >= this.tableWidth) this.dx = -this.dx;
    if (this.xpos + 3 >= this.tableWidth) this.dx = -this.dx;
    else if (this.xpos - 3 <= 0) this.dx = -this.dx;
    else if (this.ypos + 3 >= this.tableHeight) this.dy = -this.dy;
    else if (this.ypos - 3 <= 0) this.dy = -this.dy;
    //touch the paddle
    this.checkBallTouchPaddle(data, true);
    if (this.checkLoss(data)) {
      this.xpos = 50;
      this.ypos = 50;
      data.upPos = 50;
      data.downPos = 50;
      return false;
    }

    this.xpos += this.dx;
    this.ypos += this.dy;
    return true;
    //this.xpos += this.dx * delta;
    //this.ypos += this.dy * delta;
    //console.log(this.xpos);
    //console.log(this.ypos);
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

  setBallSight({xDirection, yDirection} : {xDirection: number, yDirection: number}) {
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
