import { Component, Input } from '@angular/core';
import { InteractionSocialeService } from 'src/services/interaction-social-service';
import { UsersListVerticalComponent } from "../../../user/users-list-vertical/users-list-vertical.component";
import { NgIf } from '@angular/common';
import { Publication } from 'src/models/publication.model';

@Component({
  standalone: true,
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss'],
  imports: [NgIf, UsersListVerticalComponent]

})
export class LikeButtonComponent {

  displayListeLike_: boolean = false;
  isLiked: boolean = false;
  @Input() post !: Publication;
  interactionId = ""
  constructor(private interactionSocialeService: InteractionSocialeService) { }

  ngOnInit() {
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

  displayListeLike() {
    this.displayListeLike_ = !this.displayListeLike_
  }


  get LikedBy() {
    // return (this.interactionSociale.likedBy_ && this.interactionSociale) ? this.interactionSociale.likedBy_ : []
    return this.interactionSocialeService.getAllLikesByPostId(this.post._id)
  }

}
