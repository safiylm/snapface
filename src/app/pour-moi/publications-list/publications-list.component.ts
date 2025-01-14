import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Abonnee } from 'src/models/abonnee.model';
import { Publication } from 'src/models/publication.model';
import { AbonneeService } from 'src/services/abonnee-service';
import { PublicationsService } from 'src/services/publication-service';
import { forkJoin } from 'rxjs';
import { PublicationComponent } from 'src/app/publication/publication.component';


@Component({
  standalone: true,
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.scss'],
  imports:[PublicationComponent, PublicationsListComponent, NgFor, NgIf]
})
export class PublicationsListComponent implements OnInit {

  constructor(
    private publicationService: PublicationsService) { }

  abonnement !: Abonnee;
  publication !: Publication[];
  @Input() userId !: string;

  ngOnInit() {
    this.publicationService.getAllPublicationsByUserId(this.userId)
      .subscribe({
        next: (data) => {
          if (data) {
            this.publication = data;
          }
        }, error: (e) => console.error(e)
      })
  }
}
