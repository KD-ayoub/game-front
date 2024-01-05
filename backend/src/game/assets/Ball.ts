const INITIAL_VELOCITY: number = 0.02;
//const INITIAL_VELOCITY: number = 0.005;

export class Ball {
  private speed: number;
  private tableWidth: number;
  private tableHeight: number;
  public xpos: number;
  public ypos: number;
  private dx: number;
  private dy: number;
  private gap: number;

	constructor() {
    this.speed = INITIAL_VELOCITY;
    this.tableWidth = 100;
    this.tableHeight = 100;
    this.xpos = this.tableWidth / 2;
    this.ypos = this.tableHeight / 2;
	}

  checkBallTouchPaddle(data: any, chk: boolean): boolean {
    if (this.ypos <= 5 &&
        (((this.xpos - 3 >= data.upPos - 15) &&
          (this.xpos - 3 <= data.upPos + 15)) ||
            ((this.xpos + 3 >= data.upPos - 15) &&
             (this.xpos + 3 <= data.upPos + 15))))
    {
      if (chk) this.dy = -this.dy;
      return true;
    }
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
    if (!this.checkBallTouchPaddle(data, false) &&
        (((this.ypos) < 5) ||
         ((this.ypos) > 95))) {

      return true;
    }
    return false;
  }

  updateBall(delta: number, data: any): boolean {
    if (this.xpos + 3 >= this.tableWidth) this.dx = -this.dx;
    else if (this.xpos - 3 <= 0) this.dx = -this.dx;
    else if (this.ypos + 3 >= this.tableHeight) this.dy = -this.dy;
    else if (this.ypos - 3 <= 0) this.dy = -this.dy;
    //touch the paddle
    this.checkBallTouchPaddle(data, true);
    if (this.checkLoss(data))
      return false;
    this.xpos += this.dx * delta;
    this.ypos += this.dy * delta;
    return true;
  }

  getData(client: string) {
    return {
      socket: client,
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
