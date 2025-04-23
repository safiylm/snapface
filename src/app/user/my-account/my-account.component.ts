import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { HeaderSnapComponent } from '../header-snap/header-snap.component';
import { PublicationListComponent } from '../../post/publication-list/publication-list.component';
import { LikedListComponent } from "../../post/liked-list/liked-list.component";
import { PointedListComponent } from "../../post/pointed-list/pointed-list.component";

@Component({
  standalone:true, 
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'], 
  imports: [HeaderComponent, HeaderSnapComponent,
    PublicationListComponent, LikedListComponent, PointedListComponent]
})
export class MyAccountComponent implements OnInit {
  id !: string ;
  
  ngOnInit() {
    this.id = localStorage.getItem('userId')?.toString() as string;
  }
  
}
