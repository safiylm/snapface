import { Component, Input } from '@angular/core';
import { InteractionSocialeService } from 'src/services/interaction-social-service';
import { UsersListVerticalComponent } from "../../../user/users-list-vertical/users-list-vertical.component";
import { NgClass, NgIf } from '@angular/common';
import { Publication } from 'src/models/publication.model';
import { transition, style, animate, trigger } from '@angular/animations';

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
  }

  addLike(): void {
    this.interactionSocialeService.addLike(this.post._id).subscribe(data => {
      if (data) {
        this.interactionId = data._id
        this.post.likesCount++
        this.isLiked = true
      }
    })
  }

  removeLike() {
    if (this.isLiked && this.interactionId != "")
      this.interactionSocialeService.removeLike(this.post._id, this.interactionId)
        .subscribe(data => {
          if (data) {
            this.isLiked = false
            this.post.likesCount--
          }
        })
  }


  get LikedBy() {
    // return (this.interactionSociale.likedBy_ && this.interactionSociale) ? this.interactionSociale.likedBy_ : []
    return this.interactionSocialeService.getAllLikesByPostId(this.post._id)
  }

}
