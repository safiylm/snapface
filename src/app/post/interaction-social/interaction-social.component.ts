import { Component, Input, Renderer2 } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Publication } from 'src/models/publication.model';
import { UserService } from 'src/services/user-service';
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
  imports: [
    NgIf, FormsModule,  NgClass,
    NgFor, CommentaireListComponent, SignalerPostComponent, MatButtonModule, MatMenuModule],
  animations: [
    fadeIn,
    fadeOut
  ]
})


export class InteractionSocialComponent {

  @Input() post !: Publication;
  @Input() isMyPost !: boolean;

  //isMobile !: boolean;
  users: any[] = []

  isReposted = false;
  isLiked = false;
  isSaved = false;
  saveId = ""
  likeId = ""
  repostId = ""
isShowListOfButton= false

  constructor(
    private userService: UserService,
    private interactionService: InteractionSocialeService, private renderer: Renderer2) { }

  ngOnInit() {

    this.interactionService.joinRoom(this.post._id);

    this.interactionService.interactionExist(this.post._id,
        JSON.parse( localStorage.getItem("userconnected")?.toString() as string).userId
        ).subscribe({
        next: (data) => {
          if (data != null) {
          
            if (data.type == "repost") {
              this.isReposted = true
              this.repostId = data._id
            }
            if (data.type == "enregistrement") {
              this.isSaved = true
              this.saveId = data._id
            }
            if (data.type == "like") {
              this.isLiked = true
              this.likeId = data._id
            }
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
      if (data['postId'] == this.post._id && data['interaction'] == "like") {

        if (data["action"] == "remove" ) {
          this.isLiked = false
          this.likeId = ""
        }
        if (data["action"] == "add" ) {
          this.isLiked = true
          this.likeId = data.interactionId
        }
      }

      if (data['postId'] == this.post._id && data['interaction'] == "enregistrement") {

        if (data["action"] == "remove") {
          this.isSaved = false
          this.saveId = ""
        }
        if (data["action"] == "add") {
          this.isSaved = true
          this.saveId = data.interactionId
        }
      }
    });

  }


  goToEditPost() {
    document.location.href = 'post-edit/' + this.post._id
  }


  interact(interation: string) {
    if (interation == "repost") {
      if (this.isReposted)
        this.interactionService.remove(this.post._id, this.repostId, "repost")
      else
        this.interactionService.create(this.post._id, "repost")
    }
    if (interation == "enregistrement") {

      if (!this.isSaved)
        this.interactionService.create(this.post._id, "enregistrement")
      else
        this.interactionService.remove(this.post._id, this.saveId, "enregistrement")
    }
    if (interation == "like") {

      if (!this.isLiked)
        this.interactionService.create(this.post._id, "like")
      else
        if (this.isLiked && this.likeId != "") {
          this.interactionService.remove(this.post._id, this.likeId, "like")
        }
    }
  }

  //SEND MESSAGE 
  sendPostByMesssagePrivee(receiver: string, conversationId: string) {

    // this.chatService.create(
    //   localStorage.getItem("userId")!.toString() as string,
    //   receiver,// "662eb2a1c2fd9ad3238d7528",
    //   conversationId,// "680b8d60a105a35cfb4942e6",
    //   "", this.post._id)
  }


  load() {

    // this.chatService.getUsersWeHaveConversation(localStorage.getItem('userId')?.toString() as string)
    //   .subscribe((data: Conversation[]) => {
    //     if (data) {
    //       for (let c of data) {
    //         if (c.speaker[0] == localStorage.getItem("userId")?.toString() as string)
    //           this.userService.getUser(c.speaker[1]).subscribe(
    //             (dataa: User) => {
    //               this.users.push([dataa, c._id])
    //             }
    //           )
    //         else
    //           this.userService.getUser(c.speaker[0]).subscribe(
    //             (dataa: User) => {
    //               this.users.push([dataa, c._id])
    //             }
    //           )
    //       }
    //     }
    //   });
  }

}
