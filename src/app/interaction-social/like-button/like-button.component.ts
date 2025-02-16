import { Component, Input } from '@angular/core';
import { InteractionSociale } from 'src/models/interaction.sociale.model';
import { InteractionSocialeService } from 'src/services/interaction-social-service';
import { UsersListVerticalComponent } from "../../users-list-vertical/users-list-vertical.component";
import { NgIf } from '@angular/common';

@Component({ 
  standalone: true,
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss'],
    imports: [NgIf, UsersListVerticalComponent]
  
})
export class LikeButtonComponent {
  interactionSociale !: InteractionSociale;
  displayListeLike_:boolean = false;
  @Input() isLiked_!:boolean ;
  @Input() total_like!: number;
  @Input() list!: [string];
  constructor(private interactionSocialeService: InteractionSocialeService ) { }

  addLike(): void {
    this.interactionSocialeService.addLike(this.interactionSociale._id );
    setTimeout(()=>{
     // this.display();
    },350)
  }


  removeLike() {
    this.interactionSocialeService.removeLike(this.interactionSociale._id);
    setTimeout(()=>{
     // this.display();
    },450)
  }

  displayListeLike(){
    this.displayListeLike_= ! this.displayListeLike_
  }

  get Likes(){
    return (this.total_like )? this.total_like : 0
  }

      
  get LikedBy(){
    return (this.list) ? this.list : 0
  }

}
