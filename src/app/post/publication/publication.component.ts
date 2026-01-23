import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { Publication } from '../../../models/publication.model';
import { AuteurInPostOrCommentaireComponent } from '../../user/auteur-in-post-or-commentaire/auteur-in-post-or-commentaire.component';
import { CommentaireListComponent } from '../../comment/commentaire-list/commentaire-list.component';
import { NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { ImagesVideoComponent } from "./images-video/images-video.component";
import { MatCardModule } from '@angular/material/card';
import { PublicationsService } from 'src/services/publication-service';
import { InteractionSocialComponent } from '../interaction-social/interaction-social.component';

@Component({
  standalone: true,
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss'],
  imports: [AuteurInPostOrCommentaireComponent, NgClass,
    CommentaireListComponent, TitleCasePipe, InteractionSocialComponent,
    NgIf, ImagesVideoComponent, MatCardModule]
})

export class PublicationComponent {

  @Input() publication !: Publication | any;
  isDisplayComments: boolean = false;
  isMyPost: boolean = false;
  @ViewChildren('autoVideo') videoElements!: QueryList<ElementRef<HTMLVideoElement>>;

  @Input() shadow !: boolean;
  constructor(private publicationService: PublicationsService) { }

  ngOnInit() {
    if (document.URL.includes('post'))
      this.publicationService.getPublicationById(document.URL.split("post/")[1].toString())
        .subscribe(data => {
          this.publication = data;
        })
  }



  ngAfterViewInit(): void {

    if (this.UserId == JSON.parse(localStorage.getItem('userconnected')?.toString() as string).userId) {
      this.isMyPost = true;
    }
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
