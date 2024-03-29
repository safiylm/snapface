import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'
import {  AuthConnexionUserComponent } from './auth-connexion-user/auth-connexion-user.component'
import { AuthInscriptionUserComponent } from './auth-inscription-user/auth-inscription-user.component'
import { UserAccountComponent } from './user-account/user-account.component'
import { UserDataUpdateComponent } from './user-data-update/user-data-update.component'
import { PublicationCreateComponent } from './publication-create/publication-create.component';
import { PublicationEditComponent } from './publication-edit/publication-edit.component';
const routes: Routes = [
  { path: 'user/:id', component: UserAccountComponent  },
  { path: '', component:  HomeComponent },
  { path: 'connexion', component:  AuthConnexionUserComponent },
  { path: 'inscription', component:  AuthInscriptionUserComponent },
  { path: 'user/data/update', component:  UserDataUpdateComponent },
  { path: 'publication/creation', component:  PublicationCreateComponent },
  { path: 'publication/edit/:id', component:  PublicationEditComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
