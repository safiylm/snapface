import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Publication } from '../../models/publication.model';
import { AuteurInPostOrCommentaireComponent } from '../auteur-in-post-or-commentaire/auteur-in-post-or-commentaire.component';
import { InteractionSocialComponent } from '../interaction-social/interaction-social.component';
import { CommentaireListComponent } from '../commentaire-list/commentaire-list.component';
import { NgIf, TitleCasePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss'],
  imports: [AuteurInPostOrCommentaireComponent,
    InteractionSocialComponent, CommentaireListComponent, TitleCasePipe,
    NgIf]
})

export class PublicationComponent {

  @Input() publication!: Publication;
  isDisplayListOfComments: boolean = false;
  // constructor() { }
  index: number = 0;
  isMyPost: boolean = false;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  ngAfterContentChecked() {
    if (this.UserId == localStorage.getItem('userId')) {
      this.isMyPost = true;
    }

  }


  goToEditPost() {
    document.location.href = 'publication/edit/' + this.publication._id
  }

  toggleDisplayListOfComments(event: string) {
    this.isDisplayListOfComments = event as unknown as boolean;
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
    this.audioPlayer?.nativeElement.play();
  }

  audioEnd() {
    this.audioPlayer?.nativeElement.pause();
    this.audioPlayer.nativeElement.currentTime = 0; // remet à zéro si tu veux
  }

}
