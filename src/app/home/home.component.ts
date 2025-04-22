import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PublicationAllListComponent } from '../post/publication-all-list/publication-all-list.component';
import { UsersListComponent } from '../user/users-list/users-list.component';


@Component({
  selector: 'app-home',
  standalone: true, 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], 
  imports: [HeaderComponent, PublicationAllListComponent, UsersListComponent
  ]
})

export class HomeComponent{

}
