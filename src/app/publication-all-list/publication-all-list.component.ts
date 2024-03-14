import { Component, OnInit } from '@angular/core';
import { Publication } from '../../models/publication.model';
import { PublicationsService } from '../../services/publication-service'
import { InteractionSociale } from 'src/models/interaction.sociale.model';

@Component({
  selector: 'app-publication-all-list',
  templateUrl: './publication-all-list.component.html',
  styleUrls: ['./publication-all-list.component.scss']
})
export class PublicationAllListComponent implements OnInit {

  constructor(private publicationsService: PublicationsService) { }

  publications!: Publication[];
  publication = new Publication("8", "essai add new post", "", [""], Date.now(), "",);
  interactionsocial = new InteractionSociale("8", "rdtfygubjnk", 484, 47, 45, ["65cd023efb273094193ac038"], ["65cd023efb273094193ac038"]);
  userConnectedId = "65cd023efb273094193ac038"; 

  retrievePublications(): void {
    this.publicationsService.getAllPublications()
      .subscribe({
        next: (data) => {
          this.publications = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }



  ngOnInit() {
    this.retrievePublications()

  }
}