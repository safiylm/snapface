import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HeaderSnapComponent } from '../header-snap/header-snap.component';
import { PublicationListComponent } from '../publication-list/publication-list.component';
import { ChatComponent } from "../chat/chat.component";

@Component({
  standalone:true, 
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'], 
  imports: [HeaderComponent, HeaderSnapComponent,
    PublicationListComponent]
})
export class MyAccountComponent implements OnInit {
  id !: string ;
  
  ngOnInit() {
    this.id = localStorage.getItem('userId')?.toString() as string;
  }
  
}
