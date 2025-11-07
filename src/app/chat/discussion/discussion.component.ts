import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChatPriveService } from '../../../services/chatprive.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Conversation } from 'src/models/conversation';
import { UserPresentationOnTopOfChatPriveComponent } from "../discussion/user-presentation-on-top-of-chat-prive/user-presentation-on-top-of-chat-prive.component";
import { MessageComponent } from "../discussion/message/message.component";

@Component({
  standalone: true,
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss'],
  imports: [FormsModule, NgFor, NgIf,
    UserPresentationOnTopOfChatPriveComponent, MessageComponent]
})

export class DiscussionComponent {

  message: string = "";
  messages: any[] = [];
  sender: string = localStorage.getItem("userId")?.toString() as string;
  conversation !: Conversation;
  messageEdit = { 'id': "", "text": "" };
  @Input() conversationId!: string;
  @Input() firstMsjFor: string | null | undefined;

  constructor(private chatService: ChatPriveService) { }


  ngOnInit() {
    this.sender = localStorage.getItem("userId")?.toString() as string;  // ChatPublicServiceRemplace par l'ID réel de l'utilisateur

    this.chatService.joinRoom(this.conversationId)

    this.load()

    // Écoute en temps réel via socket
    this.chatService.getPrivateMessagesWithSocket().subscribe((msg) => {
      if (msg.conversationId === this.conversationId) {

        if (msg.action == "edit") {
          var foundIndex = this.messages.findIndex(x => x._id == msg._id);
          this.messages[foundIndex].text = msg.text;
        }

        if (msg.action == "create") {
          this.messages.push(msg);
        }

        if (msg.action == "delete")
          this.messages = this.messages.filter(item => item._id !== msg._id);
      }

    });

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['conversationId']?.currentValue) {
      this.conversationId = changes['conversationId'].currentValue as string
      this.load();
      this.chatService.joinRoom(this.conversationId);
    }
  }


  //SEND MESSAGE 
  create() {
    const receiver = (this.sender === this.conversation.speaker[0])
      ? this.conversation.speaker[1]
      : this.conversation.speaker[0];

    if (this.message.trim() != "" && this.conversationId.trim() != "") {

      this.chatService.create(this.sender, receiver, this.conversationId, this.message, "")
      this.message = '';
    }
  }


  createFisrt() {

    this.chatService.createConversationWithFistMessage(
      localStorage.getItem('userId')?.toString() as string, this.firstMsjFor!, this.message)
      .subscribe({
        next: (data: any) => {
          location.href = '/chat/' + data.insertedId;
        },
        error: (e) => console.error(e)
      });
  }



  getValueForEdittingMessage(value: any) {
    this.messageEdit.id = value.id
    this.messageEdit.text = value.text
  }


  submitEdit() {

    const receiver = (this.sender === this.conversation.speaker[0])
      ? this.conversation.speaker[1]
      : this.conversation.speaker[0];

    if (this.messageEdit.text.trim() && this.messageEdit.id != "" && this.messageEdit.id != undefined) {
      this.chatService.edit(this.sender, receiver, this.messageEdit.id, this.messageEdit.text, this.conversationId)
    }
    this.message = '';
    this.messageEdit.id = "";
    this.messageEdit.text = "";
  }


  load() {

    if (this.conversationId != 'conversationId123') {
      this.chatService.getConversationById(this.conversationId).subscribe((data: any) => {
        this.conversation = data;
      });
      this.chatService.getMessageHistory(this.conversationId).subscribe((data: any) => {
        this.messages = data;
      });

      // IF YOU RECEIVER  
      this.chatService.markAsSeen(this.conversationId).subscribe(
        (data) => { if (data) data })
    }
  }

}

