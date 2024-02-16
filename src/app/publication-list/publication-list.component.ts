import { Component, OnInit } from '@angular/core';
import { Publication } from '../models/publication.model';
import { PublicationsService } from '../services/publication-service'

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit {

  constructor( private publicationsService: PublicationsService) { }
 
  publications!: Publication[];

  
  retrievePublications(): void {
    this.publicationsService.getAllPublications()
      .subscribe({
        next: (data) => {
          this.publications = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  ngOnInit() {
   this.retrievePublications()

  }
}