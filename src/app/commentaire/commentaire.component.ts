import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Commentaire } from '../../models/commentaire.model';
import { CommentaireService } from '../../services/commentaire-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuteurInPostOrCommentaireComponent } from '../auteur-in-post-or-commentaire/auteur-in-post-or-commentaire.component';
import { NgIf } from '@angular/common';

@Component({ 
   standalone:true, 
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss'], 
  imports:[ReactiveFormsModule, AuteurInPostOrCommentaireComponent,
    NgIf 
   ]
})
export class CommentaireComponent //implements AfterViewInit 
{

  public edited = false;
  isMyComment: boolean = false;

  @Input() id !: string;
  @Input() isDisplayListOfComments !: boolean;
  @Input() commentaire !: Commentaire;

  commentForm = new FormGroup({
    comment: new FormControl( "" )
  });

  constructor(private commentaireService: CommentaireService) { }

  showFormEditComment() {
   // this.edited = true;
    //this.commentForm.controls['comment'].setValue(this.commentaire.title.toString())
  }

  hideFormEditComment() {
   // this.edited = false;
  }

 
  editComment(commentId: string) {
    /*if (localStorage.getItem('userId') != undefined &&
      localStorage.getItem('isLoggedIn') != "false") {

      this.commentaire._id = commentId;
      this.commentaire.title = this.commentForm.value['comment']?.toString() as string;
      this.commentaire.postId = this.id;
      this.commentaire.userId = localStorage.getItem('userId')?.toString() as string;

      this.commentaireService.updateCommentaire(this.commentaire);
      this.edited = false;
     // window.location.reload();

    } else {
      (document.getElementById("info-editComment" + this.commentaire._id) as HTMLFormElement).innerHTML = "Il faut se connecter!";
    }
*/

  }

  deleteComment(commentId: string) {
    /*
    if (localStorage.getItem('userId') != null &&
      localStorage.getItem('isLoggedIn') != "false"
    ) {
      let text = "Êtes-vous sûre de supprimer votre commentaire!\n OK or Cancel.";
      if (confirm(text) == true) {
        this.commentaireService.deleteCommentaire(commentId);
        //window.location.reload();
      } else {
        text = "You canceled!";
      }

    } else {
      (document.getElementById("info-deleteComment" + this.commentaire._id) as HTMLFormElement).innerHTML = "Il faut se connecter!";
    }
      */
  }

  get Titre(){
    return (this.commentaire && this.commentaire.title) ? this.commentaire.title : null
  }

  get UserId(){
  return (this.commentaire && this.commentaire.userId) ? this.commentaire.userId : null
  }


}
