import { Component, OnInit, Input } from '@angular/core';
import { Commentaire } from '../../models/commentaire.model';
import { CommentaireService } from '../../services/commentaire-service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent implements OnInit  {

  public edited = false;

  @Input() id !: string;
  @Input() commentaire !: Commentaire;
  //commentaire = new Commentaire("8", "Essai k+888888", Date.now(),"userid978463152","postuibjn894651") ;
  commentForm = new FormGroup({
    comment: new FormControl(""),
  });

  constructor(private commentaireService: CommentaireService) { }
  
  showFormEditComment(){
    this.edited =true;
    this.commentForm.value['comment'] =  this.commentaire.title;
  }

  hideFormEditComment(){
    this.edited =false;
  }

  
  editComment(commentId: string ){
    this.commentaire._id = commentId;
    this.commentaire.title =  this.commentForm.value['comment']?.toString() as string;
    this.commentaire.postId = this.id ;
    this.commentaire.userId= "65cd023efb273094193ac038";

    this.commentaireService.updateCommentaire(this.commentaire);
    this.edited =false;

  }

  deleteComment(commentId: string ){
    this.commentaireService.deleteCommentaire( commentId);

  }


  ngOnInit() {

  }

}
