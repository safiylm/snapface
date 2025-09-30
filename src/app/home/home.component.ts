import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PublicationAllListComponent } from '../post/list/publication-all-list/publication-all-list.component';


@Component({
  selector: 'app-home',
  standalone: true, 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], 
  imports: [HeaderComponent, PublicationAllListComponent
  ]
})

export class HomeComponent{

}
