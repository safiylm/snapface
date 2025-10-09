import { NgIf } from '@angular/common';
import { Component, HostListener, OnInit, signal } from '@angular/core';
import { ConversationListComponent } from '../chat/conversation-list/conversation-list.component';
import { AvatarUserComponent } from "./avatar-user/avatar-user.component";
import { ListFollowRequestComponent } from "../user/list-follow-request/list-follow-request.component";

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
  nbConversationWithNewMessages: number|undefined  //localStorage.getItem('nbConversationWithNewMessages')?.toString()  
    
  ngOnInit() {
    if (window.localStorage.getItem('isLoggedIn') == "true") {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    this.nbConversationWithNewMessages = Number(localStorage.getItem('nbConversationWithNewMessages')?.toString() )

  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
   
  }


}
