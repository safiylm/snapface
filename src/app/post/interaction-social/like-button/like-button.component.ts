import { Component, Input } from '@angular/core';
import { InteractionSocialeService } from 'src/services/interaction-social-service';
import { UsersListVerticalComponent } from "../../../user/users-list-vertical/users-list-vertical.component";
import { NgClass, NgIf } from '@angular/common';
import { Publication } from 'src/models/publication.model';
import { transition, style, animate, trigger } from '@angular/animations';
import {MatButtonModule} from '@angular/material/button';

const enterTransition = transition(':enter', [
  style({
    opacity: 0,
    zindex: 0
  }),
  animate('0.1s ease-in', style({
    opacity: 1,
    zindex: 0
  }))
]);

const leaveTrans = transition(':leave', [
  style({
    opacity: 1,
    zindex: 0

  }),
  animate('0.1s ease-out', style({
    opacity: 0,
    zindex: 0

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
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss'],
  imports: [NgIf, UsersListVerticalComponent, MatButtonModule],
  animations: [
    fadeIn,
    fadeOut
  ]
})

export class LikeButtonComponent {

  isLiked: boolean = false;
  @Input() post !: Publication;
  interactionId = ""
  constructor(private interactionSocialeService: InteractionSocialeService) { }

  ngOnInit(): void {
    this.interactionSocialeService.joinRoom(this.post._id);

    this.interactionSocialeService.interactionExist(this.post._id,
      localStorage.getItem("userId")?.toString() as string, "like").subscribe({
        next: (data) => {
          if (data != null) {
            this.isLiked = true
            this.interactionId = data._id
          }
        }, error: e => console.error(e)
      })

    this.interactionSocialeService.getInteractionsWithSocket().subscribe((data: any) => {
      if (data['postId'] == this.post._id && data['interaction'] == "like") {
        if (data["action"] == "remove") {
          this.isLiked = false
          this.interactionId = ""
          this.post.likesCount--

        } if (data["action"] == "add") {
          this.isLiked = true
          this.post.likesCount++
          this.interactionId = data.interactionId
        }
      }
    });


  }

  like(): void {
    if (!this.isLiked)
      this.interactionSocialeService.create(this.post._id, "like")
    else
      if (this.isLiked && this.interactionId != ""){
        this.interactionSocialeService.remove(this.post._id, this.interactionId, "like")}
  }


  get LikedBy() {
    return this.interactionSocialeService.getAllLikesByPostId(this.post._id)
  }

}

/**
 * 
 *   <!--   data-bs-toggle="offcanvas" *ngIf="post.likesCount"
    [attr.data-bs-target]="'#offcanvasNumberofLike'+post._id" [attr.aria-controls]="'offcanvasNumberofLike'+post._id"--> 
    
    
 */