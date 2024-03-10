import { Component, OnInit, Input } from '@angular/core';
import { Commentaire } from '../../models/commentaire.model';
import { CommentaireService } from '../../services/commentaire-service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-commentaire-list',
  templateUrl: './commentaire-list.component.html',
  styleUrls: ['./commentaire-list.component.scss']
})
export class CommentaireListComponent implements OnInit {


  
  commentaires !: Commentaire[];
  @Input() id !: string;
  commentaire = new Commentaire("8", "Essai k+888888", Date.now(),"userid978463152","postuibjn894651") ;

  commentForm = new FormGroup({
    comment: new FormControl(""),
  });

  constructor(private commentaireService: CommentaireService) { }


  createNewComment( ){
    this.commentaire.title =  this.commentForm.value['comment']?.toString() as string;
    this.commentaire.postId = this.id ;
    this.commentaire.userId= "65cd023efb273094193ac038";
    this.commentaireService.addNewCommentaire(this.commentaire);
    this.display();

  }


  display(){
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
