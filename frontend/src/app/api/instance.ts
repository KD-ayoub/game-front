import { type Socket, io } from "socket.io-client";
import { Manager } from "socket.io-client/debug";

interface ClientToServerEvents {
  newMessage: (msg: string) => void;
}

interface InterServerEvents {
  subscribe: (uid: string, user: string) => void;
  newMessage: (conversationUid: string, userUid: string, msg: string) => void;
}

//test redirect
import { useRouter } from 'next/router';

export class SocketClient {
  private ioClient: Socket<ClientToServerEvents, InterServerEvents>;
  private socketRoom: string;
  //private i: number;
  constructor() {
    console.log('front socket');

    this.ioClient = new Manager("http://localhost:3001", {
      autoConnect: true,
      withCredentials: true
      //extraHeaders: {
      //  //"Cookie": "connect.sid=s%3AN67lgt-727mOOyWBCDgOYkqP_crICXRR.RYayoN8tKXbZq%2FxbluLKcU0uOxbHbm08oxQr%2B89jT8k"
      //},
    }).socket("/") as unknown as Socket<
      ClientToServerEvents,
      InterServerEvents
    >;

    //this.ioClient = new WebSocket("ws://localhost:3001", [], {
    //  //credentials: 'include'
    //  withCredentials: true
    //});

    this.ioClient.on("connect", () => {
      console.log("connected", this.ioClient.id);
    });

    this.ioClient.on("disconnect", () => {
      console.log("disconnected", this.ioClient.id);
    });
  }

  //public sendMessage(conversationUid: string, userUid: string, msg: string) {
  //  this.ioClient.emit("newMessage", "", "", "")
  //}

  //public suscribeToConversation(uid: string, user: string) {
  //  this.ioClient.emit("subscribe", "", "");
  //}

  //public subscribeToMeesgae(fn: (msg: string) => void) {
  //  this.ioClient.on("newMessage", fn);
  //}

  //ana() {
  //  console.log('hani rani fi makani');
  //}

  playRandom() {
    console.log('zlit = ', this.ioClient.id);
    this.ioClient.emit("joinToPlayWithRandom", "wayli")
    //this.ioClient.on("redirectToGame", (data) => {
    //  //men be3d
    //  //const router = useRouter();
    //  //router.push("/game/user");
    //  //window.history.pushState("", "", "/game/user");
    //      window.location.href = "/game/user";
    //  console.log('****** ', data);
    //})
  }

  getSocketClient() {
    return this.ioClient;
  }

  get room() {
    return this.socketRoom;
  }

  set room(value: string) {
    this.socketRoom = value;
  }
}

export const ioClient = new SocketClient();

//export default ioClient;
