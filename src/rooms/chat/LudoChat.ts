import { ChatRoom } from './schema/ChatRoom';
import { Room, Client } from "colyseus";

const maxUser = 4;

export const SendMessage = "SendMessage";
export const LoadPrevMessage = "LoadPrevMessage";

export class LudoChat extends Room<ChatRoom> {

  setupEvent = () => {
    this.onMessage(SendMessage, (client, message) => {
      this.state.addChatMessage(message);
      this.broadcast(SendMessage, message);
    })
    // this.onMessage(UserReady, (client, message) => {
    //   console.log(message.userId, 'is ready...');
    //   this.state.setUserReady(message.userId, true);

    //   this.broadcast(UserReady, this.state.getUserReadyState(message.userId));

    //   if (this.state.userReadyToPlay()) {
    //     this.lock();
    //     this.broadcast(StartGame, this.state.getUserTurnState());
    //   }
    // });
    // this.onMessage(UserLeave, client => {
    //   this.broadcast(UserLeave, this.state.getUserByClientId(client.id));
    // });
    // this.onMessage(GetUserReady, (client, message) => {
    //   client.send(GetUserReady, this.state.getUserReady());
    // });
    // this.onMessage(UpdatePieceState, (client, message) => {
    //   this.broadcast(UpdatePieceState, this.state.updatePiece(message));
    // });
    // this.onMessage(UserSkipTurn, (client, message) => {
    //   this.broadcast(StartTurn, this.state.getUserTurnState());
    // });
    // this.onMessage(ThrowDice, (client, message) => {
    //   this.broadcast(ThrowDice, this.state.getDice(message.userId))
    // });
    // // this.onMessage(RollDicePoint, (client, message) => {
    // //   this.broadcast(RollDicePoint, this.state.updateDicePoint(message.dice1, message.dice2));
    // // })
    // this.onMessage(SyncPieceState, (client, message) => {
    //   this.broadcast(SyncPieceState, message);
    // })
  }

  // client join room by their id
  handleClientJoinRoom = (client: Client, options: any) => {
    this.setupEvent();

    client.send(LoadPrevMessage, this.state.getListChatMessage());
    
    // this.state.addUser(new User(options.userId, client.id, false));
    // this.broadcast(UserJoin, this.state.getUserInRoom());
    // client.send(MeJoin, this.state.getUserJoinState(options.userId));

    console.log("[CHAT] ", options.userId, "joined room ", this.roomId);
    console.log("client count: ", this.clients.length);
  }
    //   if (thi

  handleClientLeaveRoom = (client: Client) => {
    // this.broadcast(UserLeave, this.state.removeUserByClientId(client.id));

    // if (this.state.isEmptyRoom()) {
    //   this.disconnect();
    // } else {s.state.userReadyToPlay()) {
    //     this.lock();
    //     this.broadcast(StartGame, this.state.getUserTurnState());
    //   }
    // }
  }

  onCreate (options: any) {
    this.maxClients = maxUser;
    this.roomId = options.roomId;

    this.setMetadata({roomAlias: options.roomAlias});

    this.setState(new ChatRoom());
  }

  onJoin (client: Client, options: any) {
    // if (this.state.getUserById(options.userId)) {
    //   throw new Error(`${NormalErrorCode} You already join this room`);
    // }
    this.handleClientJoinRoom(client, options);
  }

  onLeave (client: Client, _consented: boolean) {
    this.handleClientLeaveRoom(client);

    console.log(client.id, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}