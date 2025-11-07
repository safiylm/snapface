import { Component, Input, Renderer2 } from '@angular/core';
import { LikeButtonComponent } from "./like-button/like-button.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Publication } from 'src/models/publication.model';
import { EnregistrementButtonComponent } from "./enregistrement-button/enregistrement-button.component";
import { ChatPriveService } from 'src/services/chatprive.service';
import { Conversation } from 'src/models/conversation';
import { UserService } from 'src/services/user-service';
import { User } from 'src/models/user.model';
import { CommentaireListComponent } from "../../comment/commentaire-list/commentaire-list.component";
import { transition, style, animate, trigger } from '@angular/animations';
import { SignalerPostComponent } from "../signaler-post/signaler-post.component";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { InteractionSocialeService } from 'src/services/interaction-social-service';

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
  imports: [LikeButtonComponent,
    NgIf, FormsModule, EnregistrementButtonComponent, NgClass,
    NgFor, CommentaireListComponent, SignalerPostComponent, MatButtonModule, MatMenuModule],
  animations: [
    fadeIn,
    fadeOut
  ]
})


export class InteractionSocialComponent {

  @Input() post !: Publication;
  @Input() isMyPost !: boolean;

  isReposted = false;
  isMobile !: boolean;
  users: any[] = []
  repostId = ""

  constructor(
    private chatService: ChatPriveService, private userService: UserService,
    private interactionService: InteractionSocialeService, private renderer: Renderer2) { }

  ngOnInit() {
    if (window.innerWidth <= 1050) { // Si on est sur mobile
      this.isMobile = true; // Si on veut afficher les commentaires, on cache le post
    } else {
      this.isMobile = false; // Sur PC/tablette, le post reste affiché
    }

    this.interactionService.joinRoom(this.post._id);

    this.interactionService.interactionExist(this.post._id,
      localStorage.getItem("userId")?.toString() as string, "repost").subscribe({
        next: (data) => {
          if (data != null) {
            this.isReposted = true
            this.repostId = data._id
          }
        }, error: e => console.error(e)
      })
    this.load()

    this.interactionService.getInteractionsWithSocket().subscribe((data: any) => {
      if (data['postId'] == this.post._id && data['interaction'] == "repost") {
        if (data["action"] == "remove") {
          this.isReposted = false
          this.repostId = ""
        }
        if (data["action"] == "add") {
          this.isReposted = true
          this.repostId = data.interactionId

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

  repost() {
    if (this.isReposted && this.repostId != "")
      this.interactionService.remove(this.post._id, this.repostId, "repost")
    else
      this.interactionService.create(this.post._id, "repost")
  }




  load() {

    this.chatService.getUsersWeHaveConversation(localStorage.getItem('userId')?.toString() as string)
      .subscribe((data: Conversation[]) => {
        if (data) {
          for (let c of data) {
            if (c.speaker[0] == localStorage.getItem("userId")?.toString() as string)
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

}
