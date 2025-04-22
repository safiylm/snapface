import { Component, OnInit, Input } from '@angular/core';
import { Abonnee } from '../../../models/abonnee.model'
import { AbonneeService } from '../../../services/abonnee-service'
import { Subscription } from 'rxjs';
import { AuteurInPostOrCommentaireComponent } from '../auteur-in-post-or-commentaire/auteur-in-post-or-commentaire.component';
import { NgFor } from '@angular/common';

@Component({
  standalone:true, 
  selector: 'app-list-followers',
  templateUrl: './list-followers.component.html',
  styleUrls: ['./list-followers.component.scss'], 
  imports:[AuteurInPostOrCommentaireComponent, NgFor]
})
export class ListFollowersComponent implements OnInit {

  constructor(private abonneeService: AbonneeService) { }
  @Input() id !: string;
  subscription !: Subscription;
  abonnee!: Abonnee[];



  retrievePublications(): void {
    this.subscription = this.abonneeService.getFollowersByUserId(this.id)
      .subscribe({
        next: (data) => {
          this.abonnee = data;
        },
        error: (e) => console.error(e)
      });
  }


  ngOnInit() {
    this.retrievePublications()
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  get Followers(){
    return (this.abonnee && this.abonnee) ? this.abonnee : null;
  }
}
