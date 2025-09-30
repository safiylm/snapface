import { Component, ElementRef, Input } from '@angular/core';
import { Publication } from '../../../../models/publication.model';
import { ActivatedRoute } from '@angular/router';
import { PublicationComponent } from '../../publication/publication.component';
import { NgIf, NgFor } from '@angular/common';
import { UsersListComponent } from "../../../user/users-list/users-list.component";

@Component({
  standalone: true,
  selector: 'app-publication-list-scroll',
  templateUrl: './publication-list-scroll.component.html',
  styleUrls: ['./publication-list-scroll.component.scss'],
  imports: [PublicationComponent, NgFor, NgIf, UsersListComponent]

})
export class PublicationListScrollComponent {

  publications!: Publication[];
  constructor(route: ActivatedRoute) {
    this.publications = route.snapshot.data['publications']
  }



}