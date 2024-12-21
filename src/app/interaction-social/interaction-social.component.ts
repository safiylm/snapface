import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { InteractionSociale } from '../../models/interaction.sociale.model';
import { InteractionSocialeService } from '../../services/interaction-social-service';
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { UsersListVerticalComponent } from '../users-list-vertical/users-list-vertical.component';

@Component({
  standalone:true, 
  selector: 'app-interaction-social',
  templateUrl: './interaction-social.component.html',
  styleUrls: ['./interaction-social.component.scss'], 
  imports:[NgIf, NgFor, UsersListVerticalComponent]
})


export class InteractionSocialComponent implements OnInit {

  interactionSociale !: InteractionSociale;
  @Input() id !: string;
  @Input() auteurId !: string;
  isLiked_: boolean = false;
  isPointAdded_: boolean = false;
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() isDisplayListeOfComments !: boolean ;
  subscription !: Subscription;
  displayListeLike_:boolean = false;
  displayListePoint_:boolean = false;

  constructor(private interactionSocialeService: InteractionSocialeService ) { }

  displayListeLike(){
    this.displayListeLike_= ! this.displayListeLike_
  }

  displayListePoint(){
    
    this.displayListePoint_= ! this.displayListePoint_
    console.log( this.displayListePoint_)
  }

  toggleDisplayListOfComments(value: boolean) {
    this.newItemEvent.emit( value as unknown as string );
  }

  
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
    this.interactionSocialeService.removePoints(this.interactionSociale._id, this.auteurId);
 
    setTimeout(()=>{
      this.display();
    },450)
  }


  display(){
    this.subscription = this.interactionSocialeService.getInteractionSocialeById(this.id)
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

    
  get LikedBy(){
    return (this.interactionSociale && this.interactionSociale.likedBy_ )? this.interactionSociale.likedBy_ : 0
  }


  get PointedBy(){
    return (this.interactionSociale && this.interactionSociale.pointedBy_ )? this.interactionSociale.pointedBy_ : 0
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
