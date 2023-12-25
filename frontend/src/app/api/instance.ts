import { type Socket, io } from "socket.io-client";
import { Manager } from "socket.io-client/debug";

interface ClientToServerEvents {
  newMessage: (msg: string) => void;
}

interface InterServerEvents {
  subscribe: (uid: string, user: string) => void;
  newMessage: (conversationUid: string, userUid: string, msg: string) => void;
}

export class SocketClient {
  private ioClient: Socket<ClientToServerEvents, InterServerEvents>;
  constructor() {
    this.ioClient = new Manager("http://localhost:8080", {
      autoConnect: true,
    }).socket("/") as unknown as Socket<
      ClientToServerEvents,
      InterServerEvents
    >;

    this.ioClient.on("connect", () => {
      console.log("connected");
    });
  }

  public sendMessage(conversationUid: string, userUid: string, msg: string) {
    this.ioClient.emit("newMessage", "", "", "")
  }

  public suscribeToConversation(uid: string, user: string) {
    this.ioClient.emit("subscribe", "", "");
  }

  public subscribeToMeesgae(fn: (msg: string) => void) {
    this.ioClient.on("newMessage", fn);
  }
}

const ioClient = new SocketClient();

export default ioClient;
