import { Component, Input, SimpleChanges } from '@angular/core';
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

  @Input() postId !: string;
  commentaire = new Commentaire("", "",
    "", '', null, null, null, null);
  result = "";

  constructor(private commentaireService: CommentaireService) { }


  create() {
    this.commentaireService.joinRoom(this.postId);
    this.commentaire.userId = localStorage.getItem('userId')?.toString() as string;
    this.commentaire.postId = this.postId;
    this.commentaireService.create(this.commentaire)
    this.commentaire.text=""
  }


  ngOnInit() {
    this.commentaireService.joinRoom(this.postId);
    this.commentaireService.getCommentsWithSocket().subscribe(data => {
      console.log(data)
    });
  }

}
