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
  @Input() auteurId !: string;
  
  isLiked_: boolean = false;
  isPointAdded_: boolean = false;


  constructor(private interactionSocialeService: InteractionSocialeService) { }

  addLike(): void {
    this.interactionSocialeService.addLike(this.interactionSociale._id );
    setTimeout(()=>{
      this.display();
    },350)
  }


  removeLike() {
    this.interactionSocialeService.removeLike(this.interactionSociale._id);
    setTimeout(()=>{
      this.display();
    },450)
  }


  addPoints() {
    this.interactionSocialeService.addPoints(this.interactionSociale._id, this.auteurId);
    setTimeout(()=>{
      this.display();
    },350)
  }


  removePoints() {
   // if(this.interactionSociale.points>0)
    this.interactionSocialeService.removePoints(this.interactionSociale._id, this.auteurId);
 
    setTimeout(()=>{
      this.display();
    },450)
  }


  display(){
    this.interactionSocialeService.getInteractionSocialeById(this.id)
    .subscribe( (data) => {
        this.interactionSociale = data;
        this.isLiked_ = false;
        this.isPointAdded_ = false;
        
        if(data.likedBy_)
        data.likedBy_.forEach(element => {
          if (element == localStorage.getItem('userId')) {
            this.isLiked_ = true;
          }
    
        });

        if(data.pointedBy_)

        data.pointedBy_.forEach(element => {
          if (element ==  localStorage.getItem('userId')) {
            this.isPointAdded_ = true;
          }
    
        })
      }
    );
  }
 

  ngOnInit() {
    this.display();
  }


  get Likes(){
    return (this.interactionSociale && this.interactionSociale.likes )? this.interactionSociale.likes : 0
  }
  
  get Points(){
    return (this.interactionSociale && this.interactionSociale.points )? this.interactionSociale.points : 0
  }
  
  get Comments(){
    return (this.interactionSociale && this.interactionSociale.comments )? this.interactionSociale.comments : 0
  }
  
}
