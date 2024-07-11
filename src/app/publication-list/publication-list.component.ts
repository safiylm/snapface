import { Component, OnInit , Input} from '@angular/core';
import { Publication } from '../../models/publication.model';
import { PublicationsService } from '../../services/publication-service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit {

  constructor( private publicationsService: PublicationsService, private route: ActivatedRoute) { }
  @Input() id !: string ;
 
  publications!: Publication[];
  userConnectedId = "65cd023efb273094193ac038"; 

  
  retrievePublications(): void {
    this.publicationsService.getAllPublicationsByUserId( this.id)
      .subscribe({
        next: (data) => {
          this.publications = data;
        },
        error: (e) => console.error(e)
      });
  }


  ngOnInit() {
   this.retrievePublications()

  }
}