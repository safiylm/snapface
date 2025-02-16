import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InteractionSociale } from '../../models/interaction.sociale.model';
import { InteractionSocialeService } from '../../services/interaction-social-service';
import { Subscription } from 'rxjs';
import { LikeButtonComponent } from "./like-button/like-button.component";
import { PointButtonComponent } from "./point-button/point-button.component";

@Component({
  standalone:true, 
  selector: 'app-interaction-social',
  templateUrl: './interaction-social.component.html',
  styleUrls: ['./interaction-social.component.scss'], 
  imports: [ LikeButtonComponent, PointButtonComponent]
})


export class InteractionSocialComponent implements OnInit {

  @Input() id !: string;
  @Input() auteurId !: string;
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() isDisplayListeOfComments !: boolean ;
    
  interactionSociale !: InteractionSociale;
  isLiked_: boolean = false;
  isPointAdded_: boolean = false;
  
  subscription !: Subscription;

  constructor(private interactionSocialeService: InteractionSocialeService ) { }

  display(){
    this.subscription = this.interactionSocialeService.getInteractionSocialeById(this.id)
    .subscribe( (data) => {
        this.interactionSociale = data;
        this.isLiked_ = false;
        this.isPointAdded_ = false;
        
        if(data.pointedBy_)

        data.pointedBy_.forEach(element => {
          if (element ==  localStorage.getItem('userId')) {
            this.isPointAdded_ = true;
          }
    
        })
        if(data.likedBy_ != null || data.likedBy_!= undefined)
        data.likedBy_.forEach(element => {
          if (element == localStorage.getItem('userId')) {
            this.isLiked_ = true;
          }
        });

      }
    );
  }
 
  ngOnInit() {
    this.display();
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  toggleDisplayListOfComments(value: boolean) {
    this.newItemEvent.emit( value as unknown as string );
  }
  get Comments(){
    return (this.interactionSociale && this.interactionSociale.comments )? this.interactionSociale.comments : 0
  }

}
