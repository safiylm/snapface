import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Commentaire } from '../../../models/commentaire.model';
import { CommentaireService } from '../../../services/commentaire-service';
import { FormsModule } from '@angular/forms';
import { AuteurInPostOrCommentaireComponent } from '../../user/auteur-in-post-or-commentaire/auteur-in-post-or-commentaire.component';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss'],
  imports: [AuteurInPostOrCommentaireComponent, FormsModule,
    NgIf
  ]
})

export class CommentaireComponent //implements AfterViewInit 
{

  isMyComment: boolean = false;
  result = "";
  @Input() id !: string;
  @Input() commentaire !: Commentaire;
  @Output() comment = new EventEmitter<Commentaire>();


  ngOnInit() {

      this.commentaireService.joinRoom(this.commentaire.postId);
    if (typeof localStorage.getItem("userId") !== undefined &&
      localStorage.getItem("userId") !== null && this.commentaire != null && this.commentaire != undefined) {
      this.isMyComment = this.commentaire.userId == (localStorage.getItem("userId")!.toString() as string)
    }
  }

  constructor(private commentaireService: CommentaireService) { }


  deleteComment() {
    let text = "Êtes-vous sûre de supprimer votre commentaire!\n OK or Cancel.";

    if (localStorage.getItem('userId') == this.commentaire.userId)
      if (confirm(text) == true)
        this.commentaireService.delete(this.commentaire._id, this.commentaire.postId)

  }

  sendOpenEditForm() {
    this.comment.emit(this.commentaire)
  }

  get Texte() {
    return (this.commentaire && this.commentaire.text) ? this.commentaire.text : null
  }

  get UserId() {
    return (this.commentaire && this.commentaire.userId) ? this.commentaire.userId : null
  }


}
