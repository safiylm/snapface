import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Publication } from 'src/models/publication.model';
import { InteractionSociale } from 'src/models/interaction.sociale.model';
import { PublicationsService } from 'src/services/publication-service';
import { InteractionSocialeService } from 'src/services/interaction-social-service';
import { PublicationListComponent } from '../publication-list/publication-list.component';


@Component({
  standalone: true,
  selector: 'app-interactions-list',
  templateUrl: './interactions-list.component.html',
  styleUrls: ['./interactions-list.component.scss'],
  imports: [NgIf, PublicationListComponent]
})
export class InteractionsListComponent {

  constructor(private interactionSocialeService: InteractionSocialeService,
    private postService: PublicationsService
  ) { }
  @Input() interactions !: string;
  posts: Publication[] = [];

  ngOnInit() {
    //getAllLikesByUserId
    this.interactionSocialeService.getAllInteractionsByUserId(this.interactions, 
      JSON.parse(localStorage.getItem('userconnected')?.toString() as string).userId
    ).subscribe({
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
