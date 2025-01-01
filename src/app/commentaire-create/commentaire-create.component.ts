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
  result = "";
  constructor(private commentaireService: CommentaireService) { }

  createNewComment() {
    this.commentaire.postId = this.id;
    if (localStorage.getItem('userId')) {
      if (this.commentaire.title.toString().length != 0)
        this.commentaireService.addNewCommentaire(this.commentaire).subscribe(
          {
            next: (data) => {
              if (data) {

                this.result = "Votre commentaire a été crée avec succès"
                setTimeout(()=>{
                  this.result = ""
                }, 1000)
                this.commentaire.title = ""

              }
            }, error: (e) => console.error(e)
          })
      else
        this.result = "Saisissez votre commentaire"
    } else {
      this.result = "Il faut se connecter!";
    }

  }

}
