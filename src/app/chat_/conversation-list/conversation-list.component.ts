import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Conversation } from 'src/models/conversation';
import { ChatPriveService } from 'src/services/chatprive.service';
import { ItemUserWithLastMessageComponent } from "./item-user-with-last-message/item-user-with-last-message.component";

@Component({
  standalone: true,
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss'],
  imports: [NgFor, NgIf, NgClass, ItemUserWithLastMessageComponent,]
})
export class ConversationListComponent implements OnInit {

  conversation !: Conversation[]
  constructor(private chatservice: ChatPriveService) { }
  @Output() newItemEvent2 = new EventEmitter<string>();
  me !: string;
  conversationId !: string;
  @Input() offcanvas !: string;
  @Input() inOffCanvas !: string;

  ngOnInit() {
    this.me = localStorage.getItem('userId')?.toString() as string
    this.chatservice.getUsersWeHaveConversation(this.me)
      .subscribe((data: Conversation[]) => {
        if (data != undefined && data[0]!= undefined) {
          this.conversation = data;
          this.conversationId = data[0]._id
        }
      });
  }

  choisirConversation(newItem: string) {
    this.newItemEvent2.emit(newItem);
  }


}
