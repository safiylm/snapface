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

  constructor(private publicationsService: PublicationsService, private route: ActivatedRoute) {
    this.publications = this.route.snapshot.data['publications'];
  }

  loading = true;
  publications!: Publication[];
  publication = new Publication("8", "essai add new post", "", [""], Date.now(), "",);
  interactionsocial = new InteractionSociale("", "", 0, 0, 0, [""], [""]);



  ngOnInit() {
    setTimeout(() => {
      if (this.publications != null)
        this.loading = false;
    }, 1000)

  }
}