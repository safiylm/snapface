import { NgIf } from '@angular/common';
import { Component, HostListener, OnInit, signal } from '@angular/core';
import { ConversationListComponent } from '../chat/conversation-list/conversation-list.component';
import { AvatarUserComponent } from "./avatar-user/avatar-user.component";
import { ListFollowRequestComponent } from "../user/list-follow-request/list-follow-request.component";
import { ChatPriveService } from 'src/services/chatprive.service';
import { Conversation } from 'src/models/conversation';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    NgIf, ConversationListComponent,
    AvatarUserComponent, AvatarUserComponent,
    ListFollowRequestComponent
  ]
})

export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  nbConversationWithNewMessages: number = 0;

  constructor(private chatService: ChatPriveService,
  ) {
  }
  ngOnInit() {
    if (window.localStorage.getItem('isLoggedIn') == "true") {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    this.chatService.getUsersWeHaveConversation(localStorage.getItem('userId')?.toString() as string)
      .subscribe(
        (data) => {
          for (let conv of data) {
             this.chatService.getNewMessagesByConversationId(conv._id)
              .subscribe(
                (dataa) => {
                  if (dataa.length > 0) {
                    this.nbConversationWithNewMessages = this.nbConversationWithNewMessages + 1;
                  }
                }
              )
          }

        })
}


@HostListener('window:scroll', [])
onWindowScroll() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
}


}
