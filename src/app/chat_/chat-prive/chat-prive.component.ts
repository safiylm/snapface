import { Component, OnInit } from '@angular/core';
import { ChatPriveService } from '../../../services/chatprive.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ConversationListComponent } from "../conversation-list/conversation-list.component";
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { Conversation } from 'src/models/conversation';
import { UserPresentationOnTopOfChatPriveComponent } from "./user-presentation-on-top-of-chat-prive/user-presentation-on-top-of-chat-prive.component";
import { MessageComponent } from "./message/message.component";


@Component({
  standalone: true,
  selector: 'app-chat-prive',
  templateUrl: './chat-prive.component.html',
  styleUrls: ['./chat-prive.component.scss'],
  imports: [FormsModule, NgFor, NgIf, ConversationListComponent,
    HeaderComponent,  UserPresentationOnTopOfChatPriveComponent, MessageComponent]
})

export class ChatPriveComponent implements OnInit {
  message = ""
  messages: any[] = [];
  sender: string = localStorage.getItem("userId")?.toString() as string;
  conversationId !: string;
  conversation !: Conversation;
  messageEdittingId = "";

  constructor(private chatService: ChatPriveService,
    private route: ActivatedRoute) {
    this.conversationId = this.route.snapshot.paramMap.get('id')!;
  }


  ngOnInit() {
    this.sender = localStorage.getItem("userId")?.toString() as string;  // ChatPublicServiceRemplace par l'ID réel de l'utilisateur

    this.choisirConversation(this.conversationId)
    this.chatService.getConversationById(this.conversationId).subscribe((data: any) => {
      this.conversation = data;
    });

    this.chatService.receiveMessagePrivate().subscribe(msg => {
      setTimeout(() => {
        this.messages.push(msg);
      }, 1050)
    });
  }


//SEND MESSAGE 
  sendMessagePrivee() {
    if (this.message.trim() && this.conversationId.trim()) {
      if (localStorage.getItem("userId") == this.conversation.speaker[0])
        this.chatService.sendMessagePrivee(this.sender, this.conversation.speaker[1], this.conversationId, this.message, "")
      else
        this.chatService.sendMessagePrivee(this.sender, this.conversation.speaker[0], this.conversationId, this.message, "")
      this.message = '';
    }
  }


  messageAEditer(value:string ){
    if (this.messageEdittingId == "") {
      this.messageEdittingId = value.split('-')[0];
      this.message =value.split('-')[1];
    }
  }

  submitEdit() {
    this.chatService.editMessage(this.messageEdittingId, this.message).subscribe((data: any) => {
       this.chatService.getMessageHistory(this.conversationId).subscribe((data: any) => {
         this.messages = data;
       });
    });
    this.messageEdittingId = "";
    this.message = "";

  }

  loadMessages(){
    this.chatService.getMessageHistory(this.conversationId).subscribe((data: any) => {
      this.messages = data;
    });
  }

  choisirConversation(newItem: string) {
    this.conversationId = newItem
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

