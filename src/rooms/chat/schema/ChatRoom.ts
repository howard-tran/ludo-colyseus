import { ChatMessage } from "./ChatMessage";
import { Schema, Context, type } from "@colyseus/schema";
import { v4 } from "uuid";
import * as _ from "lodash";

// 4 slot on each chatroom
export class ChatRoom extends Schema {
  @type([ChatMessage])
  listChatMessage: ChatMessage[];

  public getListChatMessage = () => {
    return {
      listMess: this.listChatMessage.map((x) => {
        return {
          id: x.id,
          senderId: x.senderId,
          chatRoomId: x.chatRoomId,
          textContent: x.textContent,
          attachment: x.attachment,
          created_at: x.created_at,
        };
      }),
    };
  };

  public addChatMessage = (msg) => {
    this.listChatMessage.push(
      new ChatMessage(
        msg.id,
        msg.chatRoomId,
        msg.senderId,
        msg.textContent,
        msg.attachment,
        msg.created_at
      )
    );
  };

  constructor() {
    super();

    this.listChatMessage = [];
  }
}
