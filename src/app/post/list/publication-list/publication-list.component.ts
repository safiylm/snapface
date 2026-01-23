import { Component, Input, Renderer2 } from '@angular/core';
import { Publication } from '../../../../models/publication.model';
import { ActivatedRoute } from '@angular/router';
import { PublicationComponent } from '../../publication/publication.component';
import { NgIf, NgFor, NgClass, JsonPipe } from '@angular/common';
import { UsersListComponent } from "../../../user/users-list/users-list.component";
import { User } from 'src/models/user.model';

@Component({
  standalone: true,
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss'],
  imports: [PublicationComponent, NgFor, NgIf,
    JsonPipe,
     UsersListComponent, NgClass]

})

export class PublicationListComponent {


  @Input() publications !: Publication[];
  user !: User;
  post: Publication | undefined;
  @Input() isDisplay !: boolean;
  menuBtnClick: boolean = false;
  isMobile : boolean= false;

  index = 0

  constructor( private route: ActivatedRoute, private renderer: Renderer2) {
    this.publications = route.snapshot.data['publications']
    this.user = route.snapshot.data['user'];
  }

  ngOnInit(){
    if(this.route.snapshot.data['publications']== null)
    this.publications =[]

  }

  clickImage(i: number){
    this.isMobile=true; this.index= i; 
  }

    isVideo(url: string): boolean {
    return url.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i) !== null;
  }

    isImage(url: string): boolean {
    return url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) !== null;
  }

}