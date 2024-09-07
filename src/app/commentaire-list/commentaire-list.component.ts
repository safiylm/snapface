import { Component, OnInit, Input } from '@angular/core';
import { Commentaire } from '../../models/commentaire.model';
import { CommentaireService } from '../../services/commentaire-service';
import { FormControl, FormGroup } from '@angular/forms';
import { InteractionSocialComponent } from '../interaction-social/interaction-social.component';

@Component({
  selector: 'app-commentaire-list',
  templateUrl: './commentaire-list.component.html',
  styleUrls: ['./commentaire-list.component.scss']
})
export class CommentaireListComponent implements OnInit {

  commentaires !: Commentaire[];
  @Input() id !: string;
  commentaire = new Commentaire("", "", Date.now(), "", "");
  @Input() isDisplayListOfComments !: boolean;

  commentForm = new FormGroup({
    comment: new FormControl(""),
  });

  constructor(private commentaireService: CommentaireService) { }


  createNewComment() {
    if (localStorage.getItem('userId') != null &&
      localStorage.getItem('isLoggedIn') != "false") {
      this.commentaire.title = this.commentForm.value['comment']?.toString() as string;
      this.commentaire.postId = this.id;
      this.commentaire.userId = localStorage.getItem('userId')?.toString() as string;
      this.commentaireService.addNewCommentaire(this.commentaire);
      setTimeout(() => {
        this.display();
        this.commentForm.reset();
      }, 500)
    } else {
      (document.getElementById("info-createNewComment" + this.id) as HTMLFormElement).innerHTML = "Il faut se connecter!";
    }

  }


  display() {
    this.commentaireService.getCommentaireByPostId(this.id)
      .subscribe({
        next: (data) => {
          this.commentaires = data;
        },
        error: (e) => console.error(e)
      });
  }

  ngOnInit() {
    this.display();
  }

  
}
