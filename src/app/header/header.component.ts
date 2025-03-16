import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConversationListComponent } from '../conversation-list/conversation-list.component';

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

  ngOnInit() {
    if (window.localStorage.getItem('isLoggedIn') == "true") {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

  }
}
