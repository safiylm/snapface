import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PublicationsListComponent } from './publications-list/publications-list.component';
import { HeaderComponent } from "../header/header.component";
import { PublicationsService } from 'src/services/publication-service';
import { Publication } from 'src/models/publication.model';
import { PublicationComponent } from "../post/publication/publication.component";

@Component({
  standalone: true,
  selector: 'app-pour-moi',
  templateUrl: './pour-moi.component.html',
  styleUrls: ['./pour-moi.component.scss'],
  imports: [NgFor, NgIf, HeaderComponent, PublicationComponent]
})
export class PourMoiComponent implements OnInit {

  publication !: Publication[];

  constructor(private publicationService: PublicationsService) { }

  ngOnInit() {
    this.publicationService.getAllPublicationsPourMoi()
      .subscribe({
        next: (data) => {
          if (data) {
            this.publication = data;
          }
        }, error: (e) => console.error(e)
      })

  }
}
