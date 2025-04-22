import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Abonnee } from 'src/models/abonnee.model';
import { AbonneeService } from 'src/services/abonnee-service';

@Component({
  standalone: true,
  selector: 'app-button-follow',
  templateUrl: './button-follow.component.html',
  styleUrls: ['./button-follow.component.scss'],
  imports: [NgIf]
})
export class ButtonFollowComponent {

  isAbonnee: boolean = false;
  constructor(private abonneeService: AbonneeService) { }
  abonnee!: Abonnee[];
  @Input() isMe !: boolean;
  @Input() pageuserid !: string;

  // get Sabonner() { return (this.abonnee && !this.isAbonnee && !this.isMe) ? "" : null }
  // get Sedesabonner() { return (this.abonnee && this.isAbonnee && !this.isMe) ? "" : null }
  
  ngOnInit() {
    this.checkAbonnement();
  }

  checkAbonnement() {
    this.abonneeService.checkabonnement(localStorage.getItem("userId")?.toString() as string, this.pageuserid)
      .subscribe({
        next: (data) => {
          if (data)
            this.isAbonnee = true;

        }, error: (e) => console.error("erreur,check abonnemnt ")

      })
  }


  sabonner() {
    this.abonneeService.create(localStorage.getItem("userId")?.toString() as string, this.pageuserid)
      .subscribe({
        next: (data) => {
          if (data)
            this.isAbonnee = true;

        }, error: (e) => console.error("erreur lorsque le user veut s'abonner")
      })
  }


  sedesabonner() {
    this.abonneeService.remove(localStorage.getItem("userId")?.toString() as string, this.pageuserid)
      .subscribe({
        next: (data) => {
          if (data)
            this.isAbonnee = false;

        }, error: (e) => console.error("erreur lorsque le user veut se desabonner")
      })
  }


}
