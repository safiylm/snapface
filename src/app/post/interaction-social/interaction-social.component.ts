import { Component, OnInit, Input, Output, EventEmitter, inject, SimpleChanges } from '@angular/core';
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

@Component({
  standalone: true,
  selector: 'app-interaction-social',
  templateUrl: './interaction-social.component.html',
  styleUrls: ['./interaction-social.component.scss'],
  imports: [LikeButtonComponent, PointButtonComponent,
    NgIf, FormsModule, EnregistrementButtonComponent,
    NgFor, CommentaireListComponent]
})


export class InteractionSocialComponent {

  @Input() post !: Publication;
  @Input() isMyPost !: boolean;

  displayFormSignalmt = false;
  displayListeConversations = false;
  signalement_raison = ""
  res_signalement = ""
  isMobile !: boolean;
  users: any[] = []

  constructor(private signalementService: SignalementService,
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
    //(sender: string, receiver: string, conversationId: string, text: string, postId: string ) {

    this.chatService.sendMessagePrivee(
      localStorage.getItem("userId")!.toString() as string,
      receiver,// "662eb2a1c2fd9ad3238d7528",
      conversationId,// "680b8d60a105a35cfb4942e6",
      "", this.post._id)
  }


  signaler() {
    let s = new Signalement("22", localStorage.getItem('userId')?.toString() as string, Date.now(),
      this.signalement_raison, this.post._id, null, null);
    this.signalementService.signalerUnePublication(s).subscribe(
      {
        next: (data) => {
          if (data) {
            this.signalement_raison = ""
            this.displayFormSignalmt = false
            this.res_signalement = "Signaler avec succès!"
            setTimeout(() => { this.res_signalement = "" }, 1500)
          }
        }, error: (e) => {
          console.error(e)
        }
      })
  }

}
