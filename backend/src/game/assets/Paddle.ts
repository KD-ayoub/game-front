export class Paddle {
  private tableWidth: number;
  private tableHeight: number;
  public paddleWidth: number;
  public paddleHeight: number;
  private paddleSpeed: number;
  private xpos: number;
  private ypos: number;
  public gap: number;

  constructor(data: any, chk: boolean) {
    this.gap = data.tableWidth < 400 ? 3 : 5;
    this.tableWidth = data.tableWidth;
    this.tableHeight = data.tableHeight;
    this.paddleWidth = this.tableWidth / 3;
    this.paddleHeight = this.tableWidth < 400 ? 6 : 12;
    this.paddleSpeed = 5;
    //check
    this.xpos = (!chk) ? (this.tableWidth - this.paddleWidth - this.gap) : this.gap;
    this.ypos = (!chk) ? (this.tableHeight - this.paddleHeight - this.gap) : this.gap;
    ////
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
		console.log('before = ', this.xpos);
    if (key === "right") this.xpos +=  this.paddleSpeed * 3.5;
    else if (key === "left") this.xpos -= this.paddleSpeed * 3.5;
		console.log('after = ', this.xpos);
  }

  getData(client: string) {
    return {
      socket: client,
      speed: this.paddleSpeed,
      xpos: this.xpos,
      ypos: this.ypos,
    };
  }
}
