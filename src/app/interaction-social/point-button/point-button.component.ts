import { Component, Input } from '@angular/core';
import { InteractionSociale } from 'src/models/interaction.sociale.model';
import { InteractionSocialeService } from 'src/services/interaction-social-service';
import { UsersListVerticalComponent } from "../../users-list-vertical/users-list-vertical.component";
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-point-button',
  templateUrl: './point-button.component.html',
  styleUrls: ['./point-button.component.scss'],
  imports: [UsersListVerticalComponent, NgIf]
})
export class PointButtonComponent {
   

  constructor(private interactionSocialeService: InteractionSocialeService) { }
  @Input() isPointAdded_!: boolean;
  @Input() interactionSociale !: InteractionSociale;

  displayListePoint_:boolean = false;

  displayListePoint() {

    this.displayListePoint_ = !this.displayListePoint_
    console.log(this.displayListePoint_)
  }

  addPoints() {
    this.interactionSocialeService.addPoints(this.interactionSociale._id,  localStorage.getItem('userId') as string);
    setTimeout(() => {
   //  this.display();
    }, 350)
  }


  removePoints() {
    this.interactionSocialeService.removePoints(this.interactionSociale._id,  localStorage.getItem('userId') as string);

    setTimeout(() => {
     // this.display();
    }, 450)
  }


  get PointedBy() {
    return (this.interactionSociale.pointedBy_ && this.interactionSociale) ? this.interactionSociale.pointedBy_ : []
  }

}
