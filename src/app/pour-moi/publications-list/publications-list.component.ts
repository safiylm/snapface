import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Abonnee } from 'src/models/abonnee.model';
import { Publication } from 'src/models/publication.model';
import { PublicationsService } from 'src/services/publication-service';
import { PublicationComponent } from 'src/app/post/publication/publication.component';


@Component({
  standalone: true,
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.scss'],
  imports: [PublicationComponent, NgFor, NgIf]
})
export class PublicationsListComponent{

  constructor(
    private publicationService: PublicationsService) { }




}
