import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { Publication } from '../../../models/publication.model';
import { AuteurInPostOrCommentaireComponent } from '../../user/auteur-in-post-or-commentaire/auteur-in-post-or-commentaire.component';
import { InteractionSocialComponent } from '../interaction-social/interaction-social.component';
import { CommentaireListComponent } from '../../comment/commentaire-list/commentaire-list.component';
import { NgIf, TitleCasePipe } from '@angular/common';
import { AudioService } from 'src/services/audio.service';
import { ImagesVideoComponent } from "./images-video/images-video.component";

@Component({
  standalone: true,
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss'],
  imports: [AuteurInPostOrCommentaireComponent,
    InteractionSocialComponent, CommentaireListComponent, TitleCasePipe,
    NgIf, ImagesVideoComponent]
})

export class PublicationComponent {

  @Input() publication!: Publication;
  isDisplayComments: boolean = false;
  isMyPost: boolean = false;
  @ViewChildren('autoAudio') audioElements!: QueryList<ElementRef<HTMLAudioElement>>;
  @ViewChildren('autoVideo') videoElements!: QueryList<ElementRef<HTMLVideoElement>>;
  audiotitle !: string;
  audiourl!: string;
  isMobile !: boolean; // pour gérer l'affichage du post

  ngAfterContentChecked() {
    if (this.UserId == localStorage.getItem('userId')) {
      this.isMyPost = true;
    }
  }

  ngOnInit() {
    if (this.publication != null || this.publication != undefined) {

      this.audiotitle =// this.audioService.getAudioById(this.publication.audio)[0].title as string
       "Eldar Kedem - Walking Around"
      this.audiourl = //this.audioService.getAudioById(this.publication.audio)[0].url as string
     "../../../assets/audio/Eldar Kedem - Walking Around.mp3" 
      if (window.innerWidth <= 1050) { // Si on est sur mobile
        this.isMobile = true; // Si on veut afficher les commentaires, on cache le post
      } else {
        this.isMobile = false; // Sur PC/tablette, le post reste affiché
      }
    }
  }

  constructor(private elRef: ElementRef, private audioService: AudioService) { }


  ngAfterViewInit(): void {
    const audioObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const audio = entry.target as HTMLAudioElement;
        if (entry.isIntersecting) {
          audio.play().catch(() => { });
        } else {
          audio.pause();
        }
      });
    }, {
      threshold: 0.5
    });

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

    // Observer tous les audios
    this.audioElements.forEach(audioRef => {
      audioObserver.observe(audioRef.nativeElement);
    });

    // Observer toutes les vidéos
    this.videoElements.forEach(videoRef => {
      videoObserver.observe(videoRef.nativeElement);
    });

  }

  goToEditPost() {
    document.location.href = 'publication/edit/' + this.publication._id
  }

  toggleDisplayListOfComments(event: string) {
    this.isDisplayComments = event as unknown as boolean;
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

  get Audio() {
    return (this.publication && this.publication.audio) ? this.publication.audio : null
  }


}
