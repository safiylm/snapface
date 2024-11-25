import { Component, Input } from '@angular/core';
import { Publication } from '../../models/publication.model';
import { PublicationsService } from '../../services/publication-service'
import { ActivatedRoute } from '@angular/router';
import { PublicationComponent } from '../publication/publication.component';

@Component({
  standalone:true, 
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss'], 
  imports:[PublicationComponent]
})
export class PublicationListComponent {

  @Input() id !: string;
  publications!: Publication[];

  constructor(private publicationsService: PublicationsService, private route: ActivatedRoute) {
    this.publications = route.snapshot.data['publications']
  }
 
}