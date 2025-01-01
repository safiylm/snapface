import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service'
import { User } from '../../models/user.model'
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { HeaderSnapComponent } from '../header-snap/header-snap.component';
import { PublicationComponent } from '../publication/publication.component';
import { PublicationListComponent } from '../publication-list/publication-list.component';
import { PublicationCreateComponent } from '../publication-create/publication-create.component';
import { UserDataUpdateComponent } from '../user-data-update/user-data-update.component';

@Component({
  standalone:true, 
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'], 
  imports:[HeaderComponent, HeaderSnapComponent, 
    PublicationListComponent, 
  ]
})
export class MyAccountComponent implements OnInit {
  id !: string ;
  
  ngOnInit() {
    this.id = localStorage.getItem('userId')?.toString() as string;
  }

}
