//enum paddle {
//  TOP = "",
//  BOTTOM = 
//};

export class Paddle {
  private tableWidth: number;
  private tableHeight: number;
  public paddleWidth: number;
  public paddleHeight: number;
  private paddleSpeed: number;
  private xpos: number;
  private ypos: number;
  public gap: number;
  public pos: number;
  public sight: string;

  constructor(data: any, chk: boolean) {
    //this.gap = data.tableWidth < 400 ? 3 : 5;
    this.gap = 1;
    //this.tableWidth = data.tableWidth;
    //this.tableHeight = data.tableHeight;
    //this.paddleWidth = this.tableWidth / 3;
    //this.paddleHeight = this.tableWidth < 400 ? 6 : 12;
    this.paddleSpeed = 1;
    //check
    //this.xpos = (!chk) ? (this.tableWidth - this.paddleWidth - this.gap) : this.gap;
    //this.ypos = (!chk) ? (this.tableHeight - this.paddleHeight - this.gap) : this.gap;

    this.pos = 50;
    this.sight = (!chk) ? "BOTTOM" : "TOP";
    //this.xpos = (!chk) ? 0 : 1;
    //this.ypos = (!chk) ? 0 : 1;
    ////
  }

  get x() {
    return this.xpos;
  }

  get y() {
    return this.ypos;
  }

  checkRightWall() {
    //if ((this.xpos + this.paddleWidth + this.paddleSpeed) >= this.tableWidth - this.gap) return true;
    if (this.pos === 83) return true;
    return false;
  }

  checkLeftWall() {
    //if ((this.xpos - this.paddleSpeed) <= this.gap) return true;
    if (this.pos === 17) return true;
    return false;
  }

  movePaddle(key: string) {
		//console.log('before = ', this.xpos);
    //if (key === "right") this.xpos +=  this.paddleSpeed * 3.5;
    //else if (key === "left") this.xpos -= this.paddleSpeed * 3.5;
    console.log('move = ', this.pos);
    if (key === "right") this.pos += this.paddleSpeed;
    else if (key === "left") this.pos -= this.paddleSpeed;
		//console.log('after = ', this.xpos);
  }

  getData(client: string) {
    return {
      socket: client,
      pos: this.pos,
      sight: this.sight,
      speed: this.paddleSpeed,
      //xpos: this.xpos,
      //ypos: this.ypos,
    };
  }
}
