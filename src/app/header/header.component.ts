import { NgIf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ConversationListComponent } from '../conversation-list/conversation-list.component';
import { ChatPriveService } from 'src/services/chatprive.service';

@Component({
  standalone: true, 
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'], 
  imports:[
    NgIf , ConversationListComponent
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
}
