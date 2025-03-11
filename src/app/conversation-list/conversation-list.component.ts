import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Conversation } from 'src/models/conversation';
import { ChatPriveService } from 'src/services/chatprive.service';
import { ItemUserWithLastMessageComponent } from "./item-user-with-last-message/item-user-with-last-message.component";
import { ChatPriveComponent } from "../chat-prive/chat-prive.component";

@Component({
  standalone: true,
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss'],
  imports: [NgFor, ItemUserWithLastMessageComponent, ChatPriveComponent]
})
export class ConversationListComponent implements OnInit {

  conversation !: Conversation[]
  constructor(private chatservice: ChatPriveService) { }
  me !: string;
  conversationId !: string ;

  ngOnInit() {
    this.me = localStorage.getItem('userId')?.toString() as string
    this.chatservice.getUsersWeHaveConversation(this.me)
      .subscribe((data: Conversation[]) => {
        this.conversation = data;
        this.conversationId =data[0]._id
      });
  }

  choisirConversation(newItem: string) {
    this.conversationId = newItem;
    console.log(this.conversationId)
  }
}
