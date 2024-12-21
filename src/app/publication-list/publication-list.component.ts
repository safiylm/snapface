import { Component, Input } from '@angular/core';
import { Publication } from '../../models/publication.model';
import { PublicationsService } from '../../services/publication-service'
import { ActivatedRoute } from '@angular/router';
import { PublicationComponent } from '../publication/publication.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
  standalone:true, 
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss'], 
  imports:[PublicationComponent,  NgFor]
})
export class PublicationListComponent {

  @Input() id !: string;
  publications!: Publication[];

  constructor( route: ActivatedRoute) {
    this.publications = route.snapshot.data['publications']
  }
 
}