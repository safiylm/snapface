import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Commentaire } from 'src/models/commentaire.model';
import { InteractionSociale } from 'src/models/interaction.sociale.model';
import { CommentaireService } from 'src/services/commentaire-service';
import { InteractionSocialeService } from 'src/services/interaction-social-service';

@Component({
  standalone: true,
  selector: 'app-interaction-social-admin',
  templateUrl: './interaction-social-admin.component.html',
  styleUrls: ['./interaction-social-admin.component.scss'],
  imports: [CommonModule]
})

export class InteractionSocialAdminComponent {

  @Input() postId !: string;
  interactionSocial !: InteractionSociale;
  commentaires !: Commentaire[];
  pointstotalisOk = false;
  likestotalisOk = false;
  constructor(
    protected commentService: CommentaireService,
    protected interactionSocialService: InteractionSocialeService
  ) { }

  ngOnInit() {
    this.interactionSocialService.getInteractionSocialeById(this.postId)
      .subscribe({
        next: (data: InteractionSociale) => {
          if (data) {
            this.interactionSocial = data;
            if (data.likes == data.likedBy_.length) this.likestotalisOk = true
            if (data.points == data.pointedBy_.length) this.pointstotalisOk = true
          }
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des interactions socials', err);
        }
      });

    this.commentService.getCommentaireByPostId(this.postId).subscribe(
      {
        next:
          (data) => {
            if (data) {
              this.commentaires = data;
            }
          },
        error: (err) => {
          console.error('Erreur lors de la récupération des commentaires', err);
        }
      })

    setTimeout(() => {
      if (!this.likestotalisOk) {
        this.interactionSocialService.checkTotalLikes(this.postId)
      }

      if (!this.pointstotalisOk) {
        this.interactionSocialService.checkTotalPoints(this.postId)
      }
    }, 4000)

  }
}
