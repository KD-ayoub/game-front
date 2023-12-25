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
  private xpos: number;
  private ypos: number;
  private gap: number;

  constructor(context: CanvasRenderingContext2D, data: PaddleType) {
    this.context = context;
    this.color = data.color;
    this.speed = data.speed;
    this.gap = data.gap;
    this.tableWidth = data.tableWidth;
    this.tableHeight = data.tableHeight;
    this.paddleWidth = data.width;
    this.paddleHeight = data.height;
    this.paddleSpeed = data.speed;
    //check
    this.xpos = data.x;
    this.ypos = data.y;
    ////
    this.reset(data.x, data.y);
  }

  get x() {
    return this.xpos;
  }

  get y() {
    return this.ypos;
  }

  checkRightWall() {
    if ((this.xpos + this.paddleWidth + this.paddleSpeed) >= this.tableWidth - this.gap) return true;
    return false;
  }

  checkLeftWall() {
    if ((this.xpos - this.paddleSpeed) <= this.gap) return true;
    return false;
  }

  movePaddle(key: string) {
    if (key === "ArrowRight") this.xpos +=  this.paddleSpeed * 5;
    else if (key === "ArrowLeft") this.xpos -= this.paddleSpeed * 5;
  }

  drawPaddle() {
    const paddle = new Path2D();
    paddle.rect(this.xpos, this.ypos, this.paddleWidth, this.paddleHeight);
    this.context.fillStyle = this.color;
    this.context.fill(paddle);
  }

  reset(x: number, y: number) {
    this.xpos = !this.checkRightWall() ? x : x - 7;
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
      !(x > this.tableWidth - this.paddleWidth / 2 - this.gap) &&
      !(x < this.paddleWidth / 2 + this.gap) &&
      (!this.checkRightWall() || !this.checkLeftWall())
    ) {
      //if (x > this.tableWidth / 2)
      //    this.xpos += 5;
      //else
      //    this.xpos -= 5;
      this.xpos = x - this.paddleWidth / 2;
    }

    this.drawPaddle();
  }

  updatePaddle() {
    this.drawPaddle();
  }
}
