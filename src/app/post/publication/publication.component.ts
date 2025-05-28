import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { Publication } from '../../../models/publication.model';
import { AuteurInPostOrCommentaireComponent } from '../../user/auteur-in-post-or-commentaire/auteur-in-post-or-commentaire.component';
import { InteractionSocialComponent } from '../interaction-social/interaction-social.component';
import { CommentaireListComponent } from '../../comment/commentaire-list/commentaire-list.component';
import { NgIf, TitleCasePipe } from '@angular/common';
import { ImagesVideoComponent } from "./images-video/images-video.component";
import { AudioComponent } from "./audio/audio.component";

@Component({
  standalone: true,
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss'],
  imports: [AuteurInPostOrCommentaireComponent,
    InteractionSocialComponent, CommentaireListComponent, TitleCasePipe,
    NgIf, ImagesVideoComponent, AudioComponent]
})

export class PublicationComponent {

  @Input() publication!: Publication;
  isDisplayComments: boolean = false;
  isMyPost: boolean = false;
    @ViewChildren('autoVideo') videoElements!: QueryList<ElementRef<HTMLVideoElement>>;


  ngAfterContentChecked() {
    if (this.UserId == localStorage.getItem('userId')) {
      this.isMyPost = true;
    }
  }


  ngAfterViewInit(): void {
  

    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      });
    }, {
      threshold: 0.5
    });


    // Observer toutes les vidéos
    this.videoElements.forEach(videoRef => {
      videoObserver.observe(videoRef.nativeElement);
    });

  }


  get Id() {
    return (this.publication && this.publication._id) ? this.publication._id : null

  }

  get UserId() {
    return (this.publication && this.publication.userId) ? this.publication.userId : null
  }

  get Title() {
    return (this.publication && this.publication.title) ? this.publication.title : null
  }

  get Body() {
    return (this.publication && this.publication.body) ? this.publication.body : null
  }


  get Publicationn() {
    return (this.publication) ? this.publication : null
  }


}
