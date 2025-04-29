import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LikeButtonComponent } from "./like-button/like-button.component";
import { PointButtonComponent } from "./point-button/point-button.component";
import { NgIf } from '@angular/common';
import { SignalementService } from 'src/services/signalement-service';
import { FormsModule } from '@angular/forms';
import { Signalement } from 'src/models/signalement.model';
import { Publication } from 'src/models/publication.model';
import { EnregistrementButtonComponent } from "./enregistrement-button/enregistrement-button.component";

@Component({
  standalone: true,
  selector: 'app-interaction-social',
  templateUrl: './interaction-social.component.html',
  styleUrls: ['./interaction-social.component.scss'],
  imports: [LikeButtonComponent, PointButtonComponent, NgIf, FormsModule, EnregistrementButtonComponent]
})


export class InteractionSocialComponent {

  @Input() post !: Publication;
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() isDisplayListeOfComments !: boolean;

  displayFormSignalmt = false;
  signalement_raison = ""
  res_signalement = ""
  isMobile !: boolean;

  constructor(private signalementService: SignalementService) { }

  ngOnInit(){
    if (window.innerWidth <= 1050) { // Si on est sur mobile
      this.isMobile = true; // Si on veut afficher les commentaires, on cache le post
    } else {
      this.isMobile = false; // Sur PC/tablette, le post reste affiché
    }
  }

  toggleDisplayListOfComments(value: boolean) {
    this.newItemEvent.emit(value as unknown as string);
  }

  signaler() {
    let s = new Signalement("22", localStorage.getItem('userId')?.toString() as string, Date.now(),
      this.signalement_raison, this.post._id, null);
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
