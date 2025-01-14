import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Abonnee } from 'src/models/abonnee.model';
import { Publication } from 'src/models/publication.model';
import { AbonneeService } from 'src/services/abonnee-service';
import { PublicationComponent } from "../publication/publication.component";
import { PublicationsService } from 'src/services/publication-service';
import { forkJoin } from 'rxjs';
import { PublicationsListComponent } from './publications-list/publications-list.component';

@Component({
  standalone: true,
  selector: 'app-pour-moi',
  templateUrl: './pour-moi.component.html',
  styleUrls: ['./pour-moi.component.scss'],
  imports: [NgFor, NgIf, PublicationsListComponent]
})
export class PourMoiComponent implements OnInit {

  constructor(private abonneeService: AbonneeService) { }

  abonnement !: Abonnee;

  ngOnInit() {
    this.abonneeService.getAbonnementByUserId("662eb397c2fd9ad3238d752c")
      .subscribe({
        next: (data) => {
          if (data != null) {
            this.abonnement = data;
          }
        }
      })
  }
}
