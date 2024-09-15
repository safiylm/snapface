import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Commentaire } from '../../models/commentaire.model';
import { CommentaireService } from '../../services/commentaire-service';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

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
  subscription!: Subscription;
  commentForm = new FormGroup({
    comment: new FormControl(""),
  });

  constructor(private commentaireService: CommentaireService) { }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['isDisplayListOfComments']) {
      console.log('La valeur a changé de', changes['isDisplayListOfComments'].previousValue, 'à', changes['isDisplayListOfComments'].currentValue);
    }
    //this.doSomething(changes.categoryId.currentValue);
    // You can also use categoryId.previousValue and 
    // categoryId.firstChange for comparing old and new values

  }

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
    this.subscription = this.commentaireService.getCommentaireByPostId(this.id)
      .subscribe({
        next: (data) => {
          this.commentaires = data;
        },
        error: (e) => console.error(e)
      });
  }

  ngOnInit() {
    this.display();
    this.isDisplayListOfComments = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
