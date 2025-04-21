import { NgIf } from '@angular/common';
import { Component, HostListener, OnInit, signal } from '@angular/core';
import { ConversationListComponent } from '../conversation-list/conversation-list.component';
import { ChatPriveService } from 'src/services/chatprive.service';
import { AvatarUserComponent } from "./avatar-user/avatar-user.component";

@Component({
  standalone: true, 
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'], 
  imports: [
    NgIf, ConversationListComponent,
    AvatarUserComponent, AvatarUserComponent
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

  isAffix = false;
  isMenuActive = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    this.isAffix = scrollTop > 50;
   
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
    console.log('Clicked menu');
  }
}
