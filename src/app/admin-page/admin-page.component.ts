import { Component } from '@angular/core';
import { Publication } from 'src/models/publication.model';
import { User } from 'src/models/user.model';
import { PublicationsService } from 'src/services/publication-service';
import { UserService } from 'src/services/user-service';
import { StatistiqueUserComponent } from './statistique-user/statistique-user-admin.component';
import { InteractionSocialAdminComponent } from "./interaction-social-admin/interaction-social-admin.component";
import { CommonModule } from '@angular/common';

@Component({
  standalone :true,
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  imports: [StatistiqueUserComponent, InteractionSocialAdminComponent, CommonModule]
})
export class AdminPageComponent {
  users !: User[];
  posts !: Publication[];
  constructor( 
    protected postService : PublicationsService,
    protected userSerice : UserService
  ){}

  ngOnInit(){
    this.postService.getAllPublications_().subscribe({
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

}

}
