import { Component, OnInit , Input} from '@angular/core';
import { Publication } from '../../models/publication.model';
import { PublicationsService } from '../../services/publication-service'
import { ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit {

  constructor( private publicationsService: PublicationsService, private route: ActivatedRoute) { }
  @Input() id !: string ;
  subscription !: Subscription;
  publications!: Publication[]; 

  
  retrievePublications(): void {
    this.subscription= this.publicationsService.getAllPublicationsByUserId( this.id)
      .subscribe({
        next: (data) => {
          this.publications = data;
        },
        error: (e) => console.error(e)
      });
  }


  ngOnInit() {
   this.retrievePublications();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}