import { Component, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Commentaire } from 'src/models/commentaire.model';
import { CommentaireService } from 'src/services/commentaire-service';

@Component({
  standalone: true,
  selector: 'app-commentaire-edit',
  templateUrl: './commentaire-edit.component.html',
  styleUrls: ['./commentaire-edit.component.scss'],
  imports: [FormsModule]

})
export class CommentaireEditComponent {

  constructor(private commentaireService: CommentaireService) { }
  @Input() commentaire !: Commentaire;
  result = "";
  @Input() postId !: string;
  @Output() preventEditFinish = new EventEmitter<any>()

  ngOnInit() {
    this.commentaireService.joinRoom(this.postId);
    console.log(this.commentaire)
  }

  edit() {
    console.log(this.commentaire._id)
    if (this.commentaire != undefined)
      if (localStorage.getItem('userId') == this.commentaire.userId) {
        this.commentaireService.edit(this.commentaire)
        this.preventEditFinish.emit('finish')
      }
  }
}
