import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { HeaderSnapComponent } from '../header-snap/header-snap.component';
import { PublicationListComponent } from '../../post/publication-list/publication-list.component';
import { AbonneeService } from 'src/services/abonnee-service';

@Component({
  standalone:true, 
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'], 
  imports: [HeaderComponent, HeaderSnapComponent, PublicationListComponent]
})

export class UserAccountComponent {

  public id !: string ;
    isAbonnee:boolean=false;
  
  constructor( private route: ActivatedRoute, private abonneeService: AbonneeService) { 
    this.id = this.route.snapshot.paramMap.get('id')! ;  
  }

  ngOnInit() {
    this.checkAbonnement();
  }

  checkAbonnement() {
    if(this.id)
    this.abonneeService.checkabonnement(localStorage.getItem("userId")?.toString() as string,
      this.id)
      .subscribe({
        next: (data) => {
          if (data)
            this.isAbonnee = true;
        }, error: (e) => console.error("erreur,check abonnemnt ")

      })
  }

  

}
