import { Schema, Context, type } from "@colyseus/schema";

export class ChatMessage extends Schema {
  @type('string')
  id: string;
  
  @type('string')
  chatRoomId: string;
  
  @type('string')
  senderId: string;

  @type('string')
  textContent: string;

  @type('string')
  attachment: string;

  @type('number')
  created_at: number;

  constructor(id: string, chatRoomId: string, senderId: string, textContent: string, attachment: string, created_at: number) {
    super();
    
    this.id = id;
    this.chatRoomId = chatRoomId;
    this.senderId = senderId;
    this.textContent = textContent;
    this.attachment = attachment;
    this.created_at = created_at;
  }
}
