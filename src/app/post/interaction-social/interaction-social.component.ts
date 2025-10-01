import { Component, OnInit, Input, Output, EventEmitter, inject, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { LikeButtonComponent } from "./like-button/like-button.component";
import { PointButtonComponent } from "./point-button/point-button.component";
import { NgFor, NgIf } from '@angular/common';
import { SignalementService } from 'src/services/signalement-service';
import { FormsModule } from '@angular/forms';
import { Signalement } from 'src/models/signalement.model';
import { Publication } from 'src/models/publication.model';
import { EnregistrementButtonComponent } from "./enregistrement-button/enregistrement-button.component";
import { ChatPriveService } from 'src/services/chatprive.service';
import { Conversation } from 'src/models/conversation';
import { UserService } from 'src/services/user-service';
import { User } from 'src/models/user.model';
import { CommentaireListComponent } from "../../comment/commentaire-list/commentaire-list.component";
import { AuteurInPostOrCommentaireComponent } from "../../user/auteur-in-post-or-commentaire/auteur-in-post-or-commentaire.component";
import { transition, style, animate, trigger } from '@angular/animations';
import { SignalerUserComponent } from "src/app/user/signaler-user/signaler-user.component";
import { SignalerPostComponent } from "../signaler-post/signaler-post.component";

const enterTransition = transition(':enter', [
  style({
    opacity: 0
  }),
  animate('0.5s ease-in', style({
    opacity: 1
  }))
]);

const leaveTrans = transition(':leave', [
  style({
    opacity: 1
  }),
  animate('0.5s ease-out', style({
    opacity: 0
  }))
])

const fadeIn = trigger('fadeIn', [
  enterTransition
]);

const fadeOut = trigger('fadeOut', [
  leaveTrans
]);

@Component({
  standalone: true,
  selector: 'app-interaction-social',
  templateUrl: './interaction-social.component.html',
  styleUrls: ['./interaction-social.component.scss'],
  imports: [LikeButtonComponent, PointButtonComponent,
    NgIf, FormsModule, EnregistrementButtonComponent,
    NgFor, CommentaireListComponent, SignalerPostComponent],
  animations: [
    fadeIn,
    fadeOut
  ]
})


export class InteractionSocialComponent {

  @Input() post !: Publication;
  @Input() isMyPost !: boolean;

  displayListeConversations = false;

  isMobile !: boolean;
  users: any[] = []

  constructor(
    private chatService: ChatPriveService, private userService: UserService) { }

  ngOnInit() {
    if (window.innerWidth <= 1050) { // Si on est sur mobile
      this.isMobile = true; // Si on veut afficher les commentaires, on cache le post
    } else {
      this.isMobile = false; // Sur PC/tablette, le post reste affiché
    }

    this.chatService.getUsersWeHaveConversation(localStorage.getItem('userId')?.toString() as string)
      .subscribe((data: Conversation[]) => {
        if (data) {
          for (let c of data) {
            if (this.users[0] == localStorage.getItem("userId")?.toString() as string)
              this.userService.getUser(c.speaker[1]).subscribe(
                (dataa: User) => {
                  this.users.push([dataa, c._id])
                }
              )
            else
              this.userService.getUser(c.speaker[0]).subscribe(
                (dataa: User) => {
                  this.users.push([dataa, c._id])
                }
              )
          }
        }
      });
  }

  goToEditPost() {
    document.location.href = 'publication/edit/' + this.post._id
  }

  //SEND MESSAGE 
  sendPostByMesssagePrivee(receiver: string, conversationId: string) {

    this.chatService.create(
      localStorage.getItem("userId")!.toString() as string,
      receiver,// "662eb2a1c2fd9ad3238d7528",
      conversationId,// "680b8d60a105a35cfb4942e6",
      "", this.post._id)
  }


}
