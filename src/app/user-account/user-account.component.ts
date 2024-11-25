import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { HeaderSnapComponent } from '../header-snap/header-snap.component';
import { PublicationListComponent } from '../publication-list/publication-list.component';

@Component({
  standalone:true, 
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'], 
  imports:[HeaderComponent, HeaderSnapComponent, PublicationListComponent]
})

export class UserAccountComponent  implements OnInit {

  public id !: string ;
  
  constructor( private route: ActivatedRoute) { 
    this.id = this.route.snapshot.paramMap.get('id')! ;  
  }

  ngOnInit() {
  }

}
