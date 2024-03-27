import { Component, OnInit, Input } from '@angular/core';
import { Abonnee } from '../../models/abonnee.model'
import { AbonneeService } from '../../services/abonnee-service'

@Component({
  selector: 'app-list-followers',
  templateUrl: './list-followers.component.html',
  styleUrls: ['./list-followers.component.scss']
})
export class ListFollowersComponent implements OnInit{

constructor( private abonneeService: AbonneeService) { }
@Input() id !: string ;

abonnee!: Abonnee[];


retrievePublications(): void {
  this.abonneeService.getAbonneeByUserId( this.id)
    .subscribe({
      next: (data) => {
        this.abonnee = data;
      //  console.log(data);
      },
      error: (e) => console.error(e)
    });
}


ngOnInit() {
 this.retrievePublications()

}
}
