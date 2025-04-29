import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Commentaire } from '../../../models/commentaire.model';
import { CommentaireService } from '../../../services/commentaire-service';
import { Subscription } from 'rxjs';
import { CommentaireComponent } from '../commentaire/commentaire.component';
import { NgFor, NgIf } from '@angular/common';
import { CommentaireCreateComponent } from '../commentaire-create/commentaire-create.component';

@Component({
  standalone: true,
  selector: 'app-commentaire-list',
  templateUrl: './commentaire-list.component.html',
  styleUrls: ['./commentaire-list.component.scss'],
  imports: [CommentaireComponent,
    NgIf, NgFor, CommentaireCreateComponent
  ]
})
export class CommentaireListComponent implements OnInit {

  commentaires !: Commentaire[];
  @Input() id !: string;
  @Input() isDisplayComments !: boolean;
  subscription!: Subscription;

  constructor(protected commentaireService: CommentaireService) { }

  ngOnChanges(changes: SimpleChanges) {
    //if (changes['isDisplayListOfComments']) //console.log("isDisplayListOfComments change ") 
  }

  display() {
    this.subscription = this.commentaireService.getCommentaireByPostId(this.id)
      .subscribe({
        next: (data) => {
          this.commentaires = data;    
           console.log( this.commentaires)
        },
        error: (e) => console.error(e)
      });
  }

  ngOnInit() {   

    this.display();
    this.isDisplayComments = true;

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
