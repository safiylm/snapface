import { Component } from '@angular/core';
import { InteractionSocialeService } from 'src/services/interaction-social-service';
import { PublicationComponent } from "../publication/publication.component";
import { PublicationsService } from 'src/services/publication-service';
import { Publication } from 'src/models/publication.model';
import { InteractionSociale } from 'src/models/interaction.sociale.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-pointed-list',
  templateUrl: './pointed-list.component.html',
  styleUrls: ['./pointed-list.component.scss'],
  imports: [PublicationComponent, NgIf, NgFor]
})
export class PointedListComponent {
 

 constructor(private interactionSocialeService: InteractionSocialeService,
    private postService: PublicationsService
  ) { }

  posts : Publication[]= [];

  ngOnInit() {
    this.interactionSocialeService.getAllPointsByUserId(localStorage.getItem('userId')?.toString() as string).subscribe({
      next: (data: InteractionSociale[]) => {
        if (data) {
          for (let x of data) {           
            this.postService.getPublicationById(x.postId).subscribe({
              next: (dataa) => {
                this.posts.push(dataa);
                console.log( this.posts)
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
