import { Component } from '@angular/core';
import { InteractionSociale } from 'src/models/interaction.sociale.model';
import { Publication } from 'src/models/publication.model';
import { InteractionSocialeService } from 'src/services/interaction-social-service';
import { PublicationsService } from 'src/services/publication-service';
import { PublicationComponent } from "../publication/publication.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-liked-list',
  templateUrl: './liked-list.component.html',
  styleUrls: ['./liked-list.component.scss'],
  imports: [PublicationComponent, NgFor, NgIf]
})
export class LikedListComponent {
  constructor(private interactionSocialeService: InteractionSocialeService,
    private postService: PublicationsService
  ) { }

  posts : Publication[]= [];

  ngOnInit() {
    this.interactionSocialeService.getAllLikesByUserId(localStorage.getItem('userId')?.toString() as string).subscribe({
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
