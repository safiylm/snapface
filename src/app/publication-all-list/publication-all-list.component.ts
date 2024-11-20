import { Component, OnInit } from '@angular/core';
import { Publication } from '../../models/publication.model';
import { PublicationsService } from '../../services/publication-service'
import { InteractionSociale } from 'src/models/interaction.sociale.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-publication-all-list',
  templateUrl: './publication-all-list.component.html',
  styleUrls: ['./publication-all-list.component.scss']
})
export class PublicationAllListComponent implements OnInit {

  publications!: Publication[];

  constructor( private route: ActivatedRoute) {
    this.publications = this.route.snapshot.data['publications'];
  }

  ngOnInit() {}
}