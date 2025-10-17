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
  @Input() firstMsjFor : string | null | undefined ;

  constructor(private chatService: ChatPriveService,
  ) {
  }


  ngOnInit() {
    this.sender = localStorage.getItem("userId")?.toString() as string;  // ChatPublicServiceRemplace par l'ID réel de l'utilisateur

    this.load()
console.log(this.conversationId)

    this.chatService.getPrivateMessagesWithSocket().subscribe(msg => {
      this.messages.push(msg);
      console.log(msg)
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.conversationId = changes['conversationId'].currentValue as string
    this.load()
  }


  //SEND MESSAGE 
  create() {
    if (this.messageEdit.text.trim() && this.conversationId.trim() != "") {
      if (localStorage.getItem("userId") == this.conversation.speaker[0])
        this.chatService.create(this.sender, this.conversation.speaker[1], this.conversationId, this.message, "")
      else
        this.chatService.create(this.sender, this.conversation.speaker[0], this.conversationId, this.message, "")
      this.messageEdit.text = '';
    }
  }

  createFisrt() {

    this.chatService.createConversationWithFistMessage(
      localStorage.getItem('userId')?.toString() as string, this.firstMsjFor! , this.message)
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

    if (this.messageEdit.text.trim() && this.messageEdit.id != "" && this.messageEdit.id != undefined) {
      if (localStorage.getItem("userId") == this.conversation.speaker[0])
        this.chatService.edit(this.sender, this.conversation.speaker[1], this.messageEdit.id, this.messageEdit.text)
      else
        this.chatService.edit(this.sender, this.conversation.speaker[0], this.messageEdit.id, this.messageEdit.text)
    }
    this.message = '';
    this.messageEdit.id = "";
    this.messageEdit.text = "";
    /*  this.chatService.getMessageHistory(this.conversationId).subscribe((data: any) => {
        this.messages = data;
     });*/
  }


  load() {

    if (this.conversationId != 'conversationId123') {
      this.chatService.getConversationById(this.conversationId).subscribe((data: any) => {
        this.conversation = data;
      });

      this.chatService.getMessageHistory(this.conversationId).subscribe((data: any) => {
        this.messages = data;
      });

      this.chatService.markAsSeen(this.conversationId).subscribe(
        (data) => { if (data) data })

    }
  }

}

