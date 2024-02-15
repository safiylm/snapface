import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'
import {  AuthConnexionUserComponent } from './auth-connexion-user/auth-connexion-user.component'
import { AuthInscriptionUserComponent } from './auth-inscription-user/auth-inscription-user.component'
import { PublicationListComponent } from './publication-list/publication-list.component'

const routes: Routes = [
  { path: 'snaps/text/:id', component:  PublicationListComponent },
  { path: '', component:  HomeComponent },
  { path: 'connexion', component:  AuthConnexionUserComponent },
  { path: 'inscription', component:  AuthInscriptionUserComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
