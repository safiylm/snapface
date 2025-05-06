import { Component, ElementRef, Input } from '@angular/core';
import { Publication } from '../../../models/publication.model';
import { ActivatedRoute } from '@angular/router';
import { PublicationComponent } from '../publication/publication.component';
import { NgIf, NgFor } from '@angular/common';
import { UsersListComponent } from "../../user/users-list/users-list.component";
import { User } from 'src/models/user.model';

@Component({
  standalone: true,
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss'],
  imports: [PublicationComponent, NgFor, NgIf, UsersListComponent]
})

export class PublicationListComponent {

  publications!: Publication[];
  user !: User;
  post: Publication | undefined ;  
  @Input() isDisplay !: boolean;
  

  constructor(route: ActivatedRoute) {
    this.publications = route.snapshot.data['publications']
        this.user = route.snapshot.data['user'];
  }

  voirPost(post: Publication){
    this.post=post;
  }

}