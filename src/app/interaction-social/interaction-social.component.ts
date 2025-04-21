import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InteractionSociale } from '../../models/interaction.sociale.model';
import { InteractionSocialeService } from '../../services/interaction-social-service';
import { Subscription } from 'rxjs';
import { LikeButtonComponent } from "./like-button/like-button.component";
import { PointButtonComponent } from "./point-button/point-button.component";
import { NgIf } from '@angular/common';
import { SignalementService } from 'src/services/signalement-service';
import { FormsModule } from '@angular/forms';
import { Signalement } from 'src/models/signalement.model';

@Component({
  standalone: true,
  selector: 'app-interaction-social',
  templateUrl: './interaction-social.component.html',
  styleUrls: ['./interaction-social.component.scss'],
  imports: [LikeButtonComponent, PointButtonComponent, NgIf, FormsModule]
})


export class InteractionSocialComponent implements OnInit {

  @Input() id !: string;
  @Input() auteurId !: string;
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() isDisplayListeOfComments !: boolean;

  displayFormSignalmt = false;
  interactionSociale !: InteractionSociale;
  isLiked_: boolean = false;
  isPointAdded_: boolean = false;
  signalement_raison = ""
  subscription !: Subscription;
  res_signalement = ""
  constructor(private interactionSocialeService: InteractionSocialeService,
    private signalementService: SignalementService) { }

  display() {
    this.subscription = this.interactionSocialeService.getInteractionSocialeById(this.id)
      .subscribe((data) => {
        this.interactionSociale = data;
        this.isLiked_ = false;
        this.isPointAdded_ = false;

        if (data.likedBy_ != null || data.likedBy_ != undefined)
          data.likedBy_.forEach(element => {
            if (element == localStorage.getItem('userId')) {
              this.isLiked_ = true;
            }
          });

        if (data.pointedBy_)

          data.pointedBy_.forEach(element => {
            if (element == localStorage.getItem('userId')) {
              this.isPointAdded_ = true;
            }

          })


      }
      );
  }

  ngOnInit() {
    this.display();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleDisplayListOfComments(value: boolean) {
    this.newItemEvent.emit(value as unknown as string);
  }
  get Comments() {
    return (this.interactionSociale && this.interactionSociale.comments) ? this.interactionSociale.comments : 0
  }

  signaler() {
    let s = new Signalement("22", localStorage.getItem('userId')?.toString() as string, Date.now(),
      this.signalement_raison, this.interactionSociale.postId, null);
    console.log(s)
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
