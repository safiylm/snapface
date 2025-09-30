import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Publication } from 'src/models/publication.model';
import { InteractionSociale } from 'src/models/interaction.sociale.model';
import { PublicationsService } from 'src/services/publication-service';
import { InteractionSocialeService } from 'src/services/interaction-social-service';
import { PublicationListComponent } from '../publication-list/publication-list.component';

@Component({
  standalone: true,
  selector: 'app-enregistrement-list',
  templateUrl: './enregistrement-list.component.html',
  styleUrls: ['./enregistrement-list.component.scss'], 
  imports: [ NgIf, PublicationListComponent]
})
export class EnregistrementListComponent {

 constructor(private interactionSocialeService: InteractionSocialeService,
    private postService: PublicationsService
  ) { }

  posts : Publication[]= [];

  ngOnInit() {
    this.interactionSocialeService.getAllEnregistrementsByUserId(localStorage.getItem('userId')?.toString() as string).subscribe({
      next: (data: InteractionSociale[]) => {
        if (data) {
          for (let x of data) {           
            this.postService.getPublicationById(x.postId).subscribe({
              next: (dataa) => {
                this.posts.push(dataa);
              },
              error: (e) => {
                console.error(e)
              }
            })
          }
        }
      }, error: (e) => {
        console.error(e)
      }
    })
  }
}
