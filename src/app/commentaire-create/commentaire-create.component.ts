import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Commentaire } from 'src/models/commentaire.model';
import { CommentaireService } from 'src/services/commentaire-service';

@Component({
  standalone: true,
  selector: 'app-commentaire-create',
  templateUrl: './commentaire-create.component.html',
  styleUrls: ['./commentaire-create.component.scss'],
  imports: [FormsModule]
})
export class CommentaireCreateComponent {
  
  @Input() id !: string;
  commentaire = new Commentaire("", "", Date.now(), localStorage.getItem('userId')?.toString() as string, '');

  constructor(private commentaireService: CommentaireService) { }

  createNewComment() {
    this.commentaire.postId = this.id;
    if (localStorage.getItem('userId') ) {
      if (this.commentaire.title.toString().length != 0)
        this.commentaireService.addNewCommentaire(this.commentaire)
      else
        (document.getElementById("info-createNewComment" + this.id) as HTMLFormElement).innerHTML = "Saisissez votre commentaire"
    } else {
      (document.getElementById("info-createNewComment" + this.id) as HTMLFormElement).innerHTML = "Il faut se connecter!";
    }

  }

}
