import { Component } from '@angular/core';
import { PublicationsService } from 'src/services/publication-service';
import { UserService } from 'src/services/user-service';
import { StatistiqueUserComponent } from './statistique-user/statistique-user-admin.component';
import { InteractionSocialAdminComponent } from "./interaction-social-admin/interaction-social-admin.component";
import { CommonModule } from '@angular/common';
import { SignalementService } from 'src/services/signalement-service';
import { UsersListVerticalComponent } from "../user/users-list-vertical/users-list-vertical.component";
import { UserComponent } from "../user/users-list/user/user.component";
import { PublicationComponent } from "../post/publication/publication.component";

@Component({
  standalone: true,
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  imports: [StatistiqueUserComponent, InteractionSocialAdminComponent,
    CommonModule, UsersListVerticalComponent, UserComponent,
    PublicationComponent]
})
export class AdminPageComponent {
  users !: any[];
  posts !: any[];

  constructor(
    protected postService: PublicationsService,
    protected userSerice: UserService,
    private signalementService: SignalementService
  ) { }

  ngOnInit() {
    /* this.postService.getAllPublications_().subscribe({
       next: (data) => {
         if (data) {
           this.posts = data;
         }
       },
       error: (err) => {
         console.error('Erreur lors de la récupération des publications', err);
       }
     });
 
     this.userSerice.getAllUsers().subscribe({
       next: (data) => {
         if (data) {
           this.users = data;
         }
       },
       error: (err) => {
         console.error('Erreur lors de la récupération des publications', err);
       }
     })
 */

    this.signalementService.getAllPostsSignale().subscribe({
      next: (data) => {
        if (data) {
          this.posts = data
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des publications', err);
      }
    });


    this.signalementService.getAllUsersSignale().subscribe({
      next: (data) => {
        if (data) {
          this.users = data;
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des publications', err);
      }
    });

  }
}


