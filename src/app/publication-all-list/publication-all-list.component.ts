import { Component, OnInit } from '@angular/core';
import { Publication } from '../models/publication.model';
import { PublicationsService } from '../services/publication-service'

@Component({
  selector: 'app-publication-all-list',
  templateUrl: './publication-all-list.component.html',
  styleUrls: ['./publication-all-list.component.scss']
})
export class PublicationAllListComponent  implements OnInit {

  constructor( private publicationsService: PublicationsService) { }
 
  publications!: Publication[];

  ngOnInit(): void {

    this.publications = this.publicationsService.publications ;

  }

}