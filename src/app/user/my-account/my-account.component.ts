import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { HeaderSnapComponent } from '../header-snap/header-snap.component';
import { PublicationListScrollComponent } from "../../post/publication-list-scroll/publication-list-scroll.component";
import { PublicationListComponent } from "../../post/publication-list/publication-list.component";

@Component({
  standalone:true, 
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'], 
  imports: [HeaderComponent, HeaderSnapComponent,
    PublicationListScrollComponent, PublicationListComponent]
})
export class MyAccountComponent implements OnInit {
  id !: string ;
  
  ngOnInit() {
    this.id = localStorage.getItem('userId')?.toString() as string;
  }
  
}
