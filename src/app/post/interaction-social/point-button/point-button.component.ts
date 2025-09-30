import { Component, Input } from '@angular/core';
import { InteractionSocialeService } from 'src/services/interaction-social-service';
import { UsersListVerticalComponent } from "../../../user/users-list-vertical/users-list-vertical.component";
import { NgIf } from '@angular/common';
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
  selector: 'app-point-button',
  templateUrl: './point-button.component.html',
  styleUrls: ['./point-button.component.scss'],
  imports: [UsersListVerticalComponent, NgIf],
   animations: [
    fadeIn,
    fadeOut
  ]
})
export class PointButtonComponent {

  isPointed: boolean = false;
  @Input() post !: Publication;
  interactionId = ""

  constructor(private interactionSocialeService: InteractionSocialeService) { }

  ngOnInit() {
    this.interactionSocialeService.getIfUserAlreadyPointPost(this.post._id,
      localStorage.getItem("userId")?.toString() as string).subscribe({
        next: (data) => {
          if (data != null) {
            this.isPointed = true
            this.interactionId = data._id

          }
        }, error: e => console.error(e)
      })

          this.interactionSocialeService.getNewPointWithSocket().subscribe((point: any) => {
      if (point['postId'] == this.post._id) {
        this.isPointed = true
        this.post.pointsCount++
          this.interactionId = point._id

      }
    });

    this.interactionSocialeService.getUnPointWithSocket().subscribe((dispoint: any) => {
      if (dispoint['postId'] == this.post._id) {
        this.isPointed = false
        this.post.pointsCount--
          this.interactionId = ""

      }
    });
  }


  point() {
    if (!this.isPointed)
      this.interactionSocialeService.addPoint(this.post._id)
    else
      if (this.isPointed && this.interactionId != "")
        this.interactionSocialeService.removePoints(this.post._id, this.interactionId)
   
  }


  get PointedBy() {
    // return (this.interactionSociale.pointedBy_ && this.interactionSociale) ? this.interactionSociale.pointedBy_ : []
    return this.interactionSocialeService.getAllPointsByPostId(this.post._id)
  }

}
