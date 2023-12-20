import { PaddleType } from "./types/paddleType";

export default class Paddle {
  private context: CanvasRenderingContext2D;
  private color: string;
  private speed: number;
  private tableWidth: number;
  private tableHeight: number;
  private paddleWidth: number;
  private paddleHeight: number;
  private paddleSpeed: number;
  private chk: boolean;
  private xpos: number;
  private ypos: number;

  constructor(context: CanvasRenderingContext2D, data: PaddleType) {
    this.context = context;
    this.color = data.color;
    this.speed = data.speed;
    this.tableWidth = 200;
    this.tableHeight = 400;
    this.paddleWidth = 100;
    this.paddleHeight = 10;
    this.paddleSpeed = 7;
    //check
    this.xpos = 0;
    this.ypos = 0;
    ////
    this.reset(data.x, data.y);
    this.chk = false;

  }

  get x() {
    return this.xpos;
  }

  get y() {
    return this.ypos;
  }

  checkRightWall() {
    if (this.xpos + this.paddleWidth >= this.tableWidth - 3) return true;
    return false;
  }

  checkLeftWall() {
    if (this.xpos <= 3) return true;
    return false;
  }

  movePaddle(key: string) {
    if (key === "ArrowRight") this.xpos += this.paddleSpeed;
    else if (key === "ArrowLeft") this.xpos -= this.paddleSpeed;
  }

  drawPaddle() {
    const paddle = new Path2D();
    paddle.rect(this.xpos, this.ypos, this.paddleWidth, this.paddleHeight);
    this.context.fillStyle = this.color;
    this.context.fill(paddle);
  }

  reset(x: number, y: number) {
    this.xpos = x;
    this.ypos = y;
  }

  //expert level
  ////updateBotPaddle(x) {
  ////    if (!(x > this.tableWidth - (this.paddleWidth / 2) - 5) &&
  //        !(x < (this.paddleWidth / 2) + 5) &&
  //        (!this.checkRightWall() || !this.checkLeftWall()))
  //        this.xpos = x - (this.paddleWidth / 2);
  //    this.drawPaddle();
  //}

  updateBotPaddle(x: number) {
    if (
      !(x > this.tableWidth - this.paddleWidth / 2 - 3) &&
      !(x < this.paddleWidth / 2 + 3) &&
      (!this.checkRightWall() || !this.checkLeftWall())
    ) {
      //if (x > this.tableWidth / 2)
      //    this.xpos += 5;
      //else
      //    this.xpos -= 5;
      if (this.chk) {
        this.xpos = x - this.paddleWidth / 2;
        this.chk = false;
      } else this.chk = true;
    }

    this.drawPaddle();
  }

  updatePaddle() {
    this.drawPaddle();
  }
}
