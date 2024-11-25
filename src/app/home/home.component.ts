import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PublicationAllListComponent } from '../publication-all-list/publication-all-list.component';
import { UsersListComponent } from '../users-list/users-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-home',
  standalone: true, 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], 
  imports: [HeaderComponent, PublicationAllListComponent, UsersListComponent,
  
  ]
})

export class HomeComponent{

}
