import { Component, Input } from '@angular/core';
import { Publication } from '../../models/publication.model';
import { ActivatedRoute } from '@angular/router';
import { PublicationComponent } from '../publication/publication.component';
import { NgIf, NgFor } from '@angular/common';
import { UsersListComponent } from "../users-list/users-list.component";

@Component({
  standalone:true, 
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss'], 
  imports: [PublicationComponent, NgFor, NgIf, UsersListComponent]
})

export class PublicationListComponent {

  @Input() id !: string;
  publications!: Publication[];

  constructor( route: ActivatedRoute) {
    this.publications = route.snapshot.data['publications']
  }
 
}