import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Abonnee } from 'src/models/abonnee.model';
import { User } from 'src/models/user.model';
import { AbonneeService } from 'src/services/abonnee-service';

@Component({
  standalone: true,
  selector: 'app-button-follow',
  templateUrl: './button-follow.component.html',
  styleUrls: ['./button-follow.component.scss'],
  imports: [NgIf]
})
export class ButtonFollowComponent {

 // isAbonnee: boolean = false;
  constructor(private abonneeService: AbonneeService) { }
  abonnee!: Abonnee[];
  @Input() isMe !: boolean;
  @Input() user !: User;
  enAttente: boolean = false;
  @Input() isAbonnee !: boolean;


  sabonner() {
    if (!this.user.isPrivate)
      this.abonneeService.create(localStorage.getItem("userId")?.toString() as string, this.user._id)
        .subscribe({
          next: (data) => {
            if (data)
              this.isAbonnee = true;
          }, error: (e) => console.error("erreur lorsque le user veut s'abonner")
        })

    else {
      this.abonneeService.createFollowRequest(localStorage.getItem("userId")?.toString() as string,
        this.user._id)
        .subscribe({
          next: (data) => {
            if (data)
              this.enAttente = true;
          }, error: (e) => console.error("erreur lorsque le user veut s'abonner")
        })
    }
  }

  ngOnInit(){
    if(this.user)
    this.abonneeService.getIfDejaEnAttente(localStorage.getItem("userId")?.toString() as string, this.user._id)
    .subscribe({
      next: (data) => {
        if (data.length!= 0){
        
          console.log(data)
          this.enAttente = true;}
      }, error: (e) => console.error("erreur, getIfDejaEnAttente")
    })

  } 

  sedesabonner() {
    this.abonneeService.remove(localStorage.getItem("userId")?.toString() as string, this.user._id)
      .subscribe({
        next: (data) => {
          if (data)
            this.isAbonnee = false;
        }, error: (e) => console.error("erreur lorsque le user veut se desabonner")
      })
  }

  renoncer() {
    this.abonneeService.renoncerFollowRequest(this.user._id).subscribe({
      next: (data: any) => {
        if (data) {
         // this.resultat = 'Demande de suivi est recjectée.'
         console.log('Rejecte')
        }
      }, error: e => {
        console.error(e)
      }
    })

  }

}
