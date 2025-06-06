import { Component, Input } from '@angular/core';
import { Commentaire } from '../../../models/commentaire.model';
import { CommentaireService } from '../../../services/commentaire-service';
import { FormsModule } from '@angular/forms';
import { AuteurInPostOrCommentaireComponent } from '../../user/auteur-in-post-or-commentaire/auteur-in-post-or-commentaire.component';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss'],
  imports: [AuteurInPostOrCommentaireComponent, FormsModule,
    NgIf
  ]
})

export class CommentaireComponent //implements AfterViewInit 
{

  public isDisplayingForm = false;
  isMyComment: boolean = false;
  result = "";
  @Input() id !: string;
  @Input() isDisplayComments !: boolean;
  @Input() commentaire !: Commentaire;


  ngOnInit() {
    
    if (typeof localStorage.getItem("userId") !== undefined &&
     localStorage.getItem("userId") !== null && this.commentaire!=null && this.commentaire!=undefined ) {
      this.isMyComment = this.commentaire.userId == (localStorage.getItem("userId")!.toString() as string)
    } 
  }

  constructor(private commentaireService: CommentaireService) { }

  showFormEditComment() {
    this.isDisplayingForm = true;
  }

  hideFormEditComment() {
    this.isDisplayingForm = false;
  }


  editComment() {
    if (localStorage.getItem('userId') == this.commentaire.userId) {

      this.commentaireService.updateCommentaire(this.commentaire).subscribe(
        {
          next: (data) => {
            if (data) {
              this.isDisplayingForm = false;
              this.result = "Commentaire modifié avec succes!"
              setInterval(() => {
                this.result = ""
              }, 1000)
            }
          }, error: e => {
            this.result = "Une erreur s'est produite veuillez réessayer!"
            setInterval(() => {
              this.result = ""
            }, 1000)
          }
        }
      )

    }

  }

  deleteComment() {

    if (localStorage.getItem('userId') == this.commentaire.userId) {

      let text = "Êtes-vous sûre de supprimer votre commentaire!\n OK or Cancel.";
    //  if (confirm(text) == true) {
        this.commentaireService.deleteCommentaire(this.commentaire._id, this.commentaire.postId)
        .subscribe(
          {
            next: (data) => {
              if (data) {
                this.isDisplayingForm = false;
                this.result = "Commentaire supprimé avec succes!"
                setInterval(() => {
                  this.result = ""
                }, 1000)
              }
            }, error: e => {
              this.result = "Une erreur s'est produite veuillez réessayer!"
              setInterval(() => {
                this.result = ""
              }, 1000)
            }
          })
      } 
   // }
  }

  get Texte() {
    return (this.commentaire && this.commentaire.text) ? this.commentaire.text : null
  }

  get UserId() {
    return (this.commentaire && this.commentaire.userId) ? this.commentaire.userId : null
  }


}
