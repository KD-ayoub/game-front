export class Paddle {
  private paddleSpeed: number;
  public pos: number;
  public sight: string;
  public win: boolean;

  constructor(chk: boolean) {
    this.paddleSpeed = 1;
    this.pos = 50;
    this.sight = (!chk) ? "BOTTOM" : "TOP";
    this.win = false;
  }

  checkRightWall() {
    return (this.pos === 83) ? true : false;
  }

  checkLeftWall() {
    return (this.pos === 17) ? true : false;
  }

  movePaddle(key: string) {
    if (key === "right") this.pos += this.paddleSpeed;
    else if (key === "left") this.pos -= this.paddleSpeed;
  }

  getData(client: string) {
    return {
      socket: client,
      pos: this.pos,
      sight: this.sight,
      speed: this.paddleSpeed,
      win: this.win
    };
  }
}
