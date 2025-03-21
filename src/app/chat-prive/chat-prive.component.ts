import { Component, OnInit } from '@angular/core';
import { ChatPriveService } from '../../services/chatprive.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ConversationListComponent } from "../conversation-list/conversation-list.component";
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { Conversation } from 'src/models/conversation';
import { UserPresentationOnTopOfChatPriveComponent } from "./user-presentation-on-top-of-chat-prive/user-presentation-on-top-of-chat-prive.component";


@Component({
  standalone: true,
  selector: 'app-chat-prive',
  templateUrl: './chat-prive.component.html',
  styleUrls: ['./chat-prive.component.scss'],
  imports: [FormsModule, NgFor, NgIf, ConversationListComponent,
    HeaderComponent, UserPresentationOnTopOfChatPriveComponent]
})

export class ChatPriveComponent implements OnInit {
  message = ""
  messages: any[] = [];
  sender: string = localStorage.getItem("userId")?.toString() as string;
  conversationId !: string;
  conversation !: Conversation;
  receiver = "";
  messageEdittingId = "";

  constructor(private chatService: ChatPriveService,
    private route: ActivatedRoute) {
    this.conversationId = this.route.snapshot.paramMap.get('id')!;
  }


  ngOnInit() {
    this.sender = localStorage.getItem("userId")?.toString() as string;  // ChatPublicServiceRemplace par l'ID réel de l'utilisateur

    this.chatService.joinRoom(this.sender);
    this.choisirConversation(this.conversationId)
    this.chatService.getConversationById(this.conversationId).subscribe((data: any) => {
      this.conversation = data;
    });
  }


  choisirConversation(newItem: string) {
    this.conversationId = newItem
    this.chatService.getConversationById(this.conversationId).subscribe((data: any) => {
      this.conversation = data;
    });
    this.chatService.getMessageHistory(newItem).subscribe((data: any) => {
      this.messages = data;
    });
  }


  sendMessagePrivee() {
    if (this.message.trim() && this.conversationId.trim()) {
      this.chatService.sendMessagePrivee(this.sender, this.conversation.speaker[1], this.conversationId, this.message)
      // this.messages.push({ sender: this.sender, text: this.message });
      this.message = '';
      setTimeout(() => {
        this.chatService.getMessageHistory(this.conversationId).subscribe((data: any) => {
          this.messages = data;
        });
      }, 20)
    }
  }


  showEdit(text: string, id: string) {

    if (this.messageEdittingId == "") {
      this.messageEdittingId = id;
      this.message = text;
    }
    else {
      this.messageEdittingId = ""
      this.message = "";
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


  delete(id: string) {
    this.chatService.deleteMessage(id).subscribe((data: any) => {
      this.chatService.getMessageHistory(this.conversationId).subscribe((data: any) => {
        this.messages = data;
      });
    });

  }

}

