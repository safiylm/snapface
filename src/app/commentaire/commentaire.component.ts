import { Component, OnInit, Input } from '@angular/core';
import { Commentaire } from '../../models/commentaire.model';
import { CommentaireService } from '../../services/commentaire-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent implements OnInit {

  public edited = false;

  isMyComment: boolean = false;

  @Input() id !: string;
  @Input() isDisplayListOfComments !: boolean;
  @Input() commentaire !: Commentaire;
  //commentaire = new Commentaire("8", "Essai k+888888", Date.now(),"userid978463152","postuibjn894651") ;
  commentForm = new FormGroup({
    comment: new FormControl( "" )
  });

  constructor(private commentaireService: CommentaireService) { }

  showFormEditComment() {
    this.edited = true;
    this.commentForm.controls['comment'].setValue(this.commentaire.title.toString())
  }

  hideFormEditComment() {
    this.edited = false;
  }


  editComment(commentId: string) {
    if (localStorage.getItem('userId') != null &&
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


  }

  deleteComment(commentId: string) {
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
  }


  ngOnInit() {
    if (this.commentaire.userId == localStorage.getItem('userId')?.toString()) {
      this.isMyComment = true;
    }
  }

}
