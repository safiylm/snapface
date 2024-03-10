import { Component, OnInit, Input } from '@angular/core';
import { InteractionSociale } from '../../models/interaction.sociale.model';
import { InteractionSocialeService } from '../../services/interaction-social-service';

@Component({
  selector: 'app-interaction-social',
  templateUrl: './interaction-social.component.html',
  styleUrls: ['./interaction-social.component.scss']
})


export class InteractionSocialComponent implements OnInit {

  interactionSociale !: InteractionSociale;
  @Input() id !: string;
  isLiked_: boolean = false;
  isPointAdded_: boolean = false;


  constructor(private interactionSocialeService: InteractionSocialeService) { }

  addLike() {
    this.interactionSocialeService.addLike(this.interactionSociale._id, this.interactionSociale.likes + 1);
    this.isLiked_ = true;
    this.display();

  }

  removeLike() {
    this.interactionSocialeService.removeLike(this.interactionSociale._id, this.interactionSociale.likes - 1);
    this.isLiked_ = false;
    this.display();

  }


  addPoints() {
    this.interactionSocialeService.addPoints(this.interactionSociale._id, this.interactionSociale.points + 1);
    this.isPointAdded_ = true;
    this.display();

  }

  removePoints() {
    this.interactionSocialeService.removePoints(this.interactionSociale._id, this.interactionSociale.points - 1);
    this.isPointAdded_ = false;
    this.display();

  }

  display(){
    this.interactionSocialeService.getInteractionSocialeById(this.id)
    .subscribe({
      next: (data) => {
        this.interactionSociale = data;
        console.log(data);
        data.likedBy_.forEach(element => {
          if (element == "65cd023efb273094193ac038") {
            console.log(element + " ------  65cd023efb273094193ac038")
            this.isLiked_ = true;
          }
          console.log(element);
    
        });

        data.pointedBy_.forEach(element => {
          if (element == "65cd023efb273094193ac038") {
            console.log(element + " ------  65cd023efb273094193ac038")
            this.isPointAdded_ = true;
          }
          console.log(element);
    
        })
      },
      error: (e) => console.error(e)
    });
  }

  ngOnInit() {
    this.display();
  }
}
