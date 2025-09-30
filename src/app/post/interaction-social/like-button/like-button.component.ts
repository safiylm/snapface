import { Component, Input } from '@angular/core';
import { InteractionSocialeService } from 'src/services/interaction-social-service';
import { UsersListVerticalComponent } from "../../../user/users-list-vertical/users-list-vertical.component";
import { NgClass, NgIf } from '@angular/common';
import { Publication } from 'src/models/publication.model';
import { transition, style, animate, trigger } from '@angular/animations';

const enterTransition = transition(':enter', [
  style({
    opacity: 0, 
    zindex:0
  }),
  animate('0.1s ease-in', style({
    opacity: 1,
    zindex:0
  }))
]);

const leaveTrans = transition(':leave', [
  style({
    opacity: 1,
    zindex:0

  }),
  animate('0.1s ease-out', style({
    opacity: 0,
    zindex:0

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
  imports: [NgIf, UsersListVerticalComponent],
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

    this.interactionSocialeService.getIfUserAlreadyLikePost(this.post._id,
      localStorage.getItem("userId")?.toString() as string).subscribe({
        next: (data) => {
          if (data != null) {
            this.isLiked = true
            this.interactionId = data._id
          }
        }, error: e => console.error(e)
      })

    this.interactionSocialeService.getNewLikeWithSocket().subscribe((like: any) => {
      if (like['postId'] == this.post._id) {
        this.isLiked = true
        this.post.likesCount++
      }
    });

    this.interactionSocialeService.getDisLikeWithSocket().subscribe((dislike: any) => {
      if (dislike['postId'] == this.post._id) {
        this.isLiked = false
        this.post.likesCount--
      }
    });


  }

  like(): void {
    if (!this.isLiked)
      this.interactionSocialeService.addLike(this.post._id)
    else
      if (this.isLiked && this.interactionId != "")
        this.interactionSocialeService.removeLike(this.post._id, this.interactionId)
  }


  get LikedBy() {
    return this.interactionSocialeService.getAllLikesByPostId(this.post._id)
  }

}
