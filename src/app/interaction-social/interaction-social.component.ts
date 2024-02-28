import { Component, OnInit, Input } from '@angular/core';
import { InteractionSociale } from '../../models/interaction.sociale.model';
import { InteractionSocialeService } from '../../services/interaction-social-service';

@Component({
  selector: 'app-interaction-social',
  templateUrl: './interaction-social.component.html',
  styleUrls: ['./interaction-social.component.scss']
})


export class InteractionSocialComponent implements OnInit {
  
  interactionSociale !: InteractionSociale ;
  @Input() id !: string ;


  constructor(private interactionSocialeService: InteractionSocialeService) { }

  addLike(_id:string , likes: number){
    this.interactionSocialeService.addLike(_id, likes);
  }

  addPoints(_id:string , points: number){
    this.interactionSocialeService.addPoints(_id, points);
  }

  ngOnInit() {
    this.interactionSocialeService.getInteractionSocialeById( this.id) 
    .subscribe({
      next: (data) => {
        this.interactionSociale = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}
