import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { AuteurInPostOrCommentaireComponent } from '../auteur-in-post-or-commentaire/auteur-in-post-or-commentaire.component';

@Component({
  standalone: true,
  selector: 'app-users-list-vertical',
  templateUrl: './users-list-vertical.component.html',
  styleUrls: ['./users-list-vertical.component.scss'],
  imports:[ NgFor, NgIf, AuteurInPostOrCommentaireComponent]
})
export class UsersListVerticalComponent {

  @Input() liste!: string[];

}
