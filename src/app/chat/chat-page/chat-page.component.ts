import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/header/header.component';
import { ConversationListComponent } from '../conversation-list/conversation-list.component';
import { DiscussionComponent } from '../discussion/discussion.component';
import { ChatPriveService } from 'src/services/chatprive.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,

  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  imports: [ConversationListComponent,
    HeaderComponent, DiscussionComponent]
})

export class ChatPageComponent {
  conversationId = ""

  choisirConversation(newItem: string) {
    this.conversationId = newItem
  }

  constructor(private chatService: ChatPriveService,
    private route: ActivatedRoute) {
    this.conversationId = this.route.snapshot.paramMap.get('id')!;
  }


}
