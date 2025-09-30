import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { HeaderSnapComponent } from '../header-snap/header-snap.component';
import { PublicationListComponent } from "../../post/list/publication-list/publication-list.component";
import { LikedListComponent } from "../../post/list/liked-list/liked-list.component";
import { PointedListComponent } from "../../post/list/pointed-list/pointed-list.component";
import { EnregistrementListComponent } from "../../post/list/enregistrement-list/enregistrement-list.component";
import { UserDataUpdateComponent } from "../edit/user-data-update/user-data-update.component";
import { PublicationCreateComponent } from "../../post/publication-create/publication-create.component";
import { NgIf } from '@angular/common';

@Component({
  standalone:true, 
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'], 
  imports: [HeaderComponent, HeaderSnapComponent, NgIf,
    PublicationListComponent, LikedListComponent, PointedListComponent, 
    EnregistrementListComponent, UserDataUpdateComponent, PublicationCreateComponent]
})
export class MyAccountComponent implements OnInit {
  id !: string ;
  display: string = 'like'
  ngOnInit() {
    this.id = localStorage.getItem('userId')?.toString() as string;
    if(sessionStorage.getItem("choixInPageUser") != null ||
    sessionStorage.getItem("choixInPageUser") != undefined  ){
      this.display = sessionStorage.getItem("choixInPageUser")?.toString() as string ;
    }
  }
  
  choixAffichageEvent(choix: string ){
    this.display=choix;
    sessionStorage.setItem("choixInPageUser", choix)
  }
}
