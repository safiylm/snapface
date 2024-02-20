import { Component, OnInit, Input } from '@angular/core';
import { Commentaire } from '../../models/commentaire.model';
import { CommentaireService } from '../../services/commentaire-service';

@Component({
  selector: 'app-commentaires',
  templateUrl: './commentaires.component.html',
  styleUrls: ['./commentaires.component.scss']
})
export class CommentairesComponent implements OnInit {

  commentaires !: Commentaire[];
  @Input() id !: string;


  constructor(private commentaireService: CommentaireService) { }


  ngOnInit() {
    this.commentaireService.getCommentaireByPostId(this.id)
      .subscribe({
        next: (data) => {
          this.commentaires = data; 
        },
        error: (e) => console.error(e)
      });
  }
}
