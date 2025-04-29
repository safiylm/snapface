import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Publication } from '../../../models/publication.model';
import { AuteurInPostOrCommentaireComponent } from '../../user/auteur-in-post-or-commentaire/auteur-in-post-or-commentaire.component';
import { InteractionSocialComponent } from '../interaction-social/interaction-social.component';
import { CommentaireListComponent } from '../../comment/commentaire-list/commentaire-list.component';
import { NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { AudioService } from 'src/services/audio.service';

@Component({
  standalone: true,
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss'],
  imports: [AuteurInPostOrCommentaireComponent,
    InteractionSocialComponent, CommentaireListComponent, TitleCasePipe,
    NgIf, NgClass]
})

export class PublicationComponent {

  @Input() publication!: Publication;
  isDisplayComments: boolean = false;
  // constructor() { }
  index: number = 0;
  isMyPost: boolean = false;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  audiotitle = "";
  audiourl = "";
  isMobile !: boolean; // pour gérer l'affichage du post

  ngAfterContentChecked() {
    if (this.UserId == localStorage.getItem('userId')) {
      this.isMyPost = true;
    }
  }

  ngOnInit() {
    this.audiotitle = this.audioService.getAudioById(this.publication.audio)[0].title
    this.audiourl = this.audioService.getAudioById(this.publication.audio)[0].url;
    if (window.innerWidth <= 1050) { // Si on est sur mobile
      this.isMobile = true; // Si on veut afficher les commentaires, on cache le post
    } else {
      this.isMobile = false; // Sur PC/tablette, le post reste affiché
    }
    console.log(this.isMobile)
  }

  constructor(private elRef: ElementRef, private audioService: AudioService) { }


  ngAfterViewInit(): void {
    const video: HTMLVideoElement = this.elRef.nativeElement.querySelector('video');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    }, {
      threshold: 0.5 // déclenche la lecture à 50% de visibilité.
    });

    observer.observe(video);

  }

  goToEditPost() {
    document.location.href = 'publication/edit/' + this.publication._id
  }

  toggleDisplayListOfComments(event: string) {
    this.isDisplayComments = event as unknown as boolean;
  
  }

  displayImageNext() {
    if (this.index < this.publication.assets.length - 1) {
      this.index += 1;
    }
  }

  displayImagePrecedent() {
    if (this.index > 0)
      this.index -= 1;
  }

  isImage(url: string): boolean {
    return url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) !== null;
  }

  isVideo(url: string): boolean {
    return url.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i) !== null;
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

  get Assets() {
    return (this.publication && this.publication.assets) ? this.publication.assets : null
  }


  get Publicationn() {
    return (this.publication) ? this.publication : null
  }

  get Audio() {
    return (this.publication && this.publication.audio) ? this.publication.audio : null
  }


  audioStart() {
    if (this.audioPlayer)
      this.audioPlayer?.nativeElement.play();
  }

  audioEnd() {
    if (this.audioPlayer) {
      this.audioPlayer?.nativeElement.pause();
      this.audioPlayer.nativeElement.currentTime = 0; // remet à zéro si tu veux
    }
  }

}
