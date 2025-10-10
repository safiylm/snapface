import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Commentaire } from '../../../models/commentaire.model';
import { CommentaireService } from '../../../services/commentaire-service';
import { Subscription } from 'rxjs';
import { CommentaireComponent } from '../commentaire/commentaire.component';
import { NgFor, NgIf } from '@angular/common';
import { CommentaireCreateComponent } from '../commentaire-create/commentaire-create.component';
import { CommentaireEditComponent } from '../commentaire-edit/commentaire-edit.component';

@Component({
  standalone: true,
  selector: 'app-commentaire-list',
  templateUrl: './commentaire-list.component.html',
  styleUrls: ['./commentaire-list.component.scss'],
  imports: [CommentaireComponent,
    NgIf, NgFor, CommentaireCreateComponent, CommentaireEditComponent
  ]
})
export class CommentaireListComponent implements OnInit {

  commentaires !: Commentaire[];
  @Input() id !: string;
  subscription!: Subscription;
  commentAEditer: Commentaire | undefined;
  constructor(protected commentaireService: CommentaireService) { }



  load() {
    this.subscription = this.commentaireService.getCommentaireByPostId(this.id)
      .subscribe({
        next: (data) => {
          this.commentaires = data;
        },
        error: (e) => console.error(e)
      });
  }

  getComment(comment: Commentaire) {
    this.commentAEditer = comment
  }

  ngOnInit() {
    this.commentaireService.joinRoom(this.id);
    this.load();
    this.commentaireService.getCommentsWithSocket().subscribe(data => {

      console.log("comm mise à jour via socket ", data)    ;
      this.load();

    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
