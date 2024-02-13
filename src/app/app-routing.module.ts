import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaceSnapListOneUserComponent } from './face-snap-list-one-user/face-snap-list-one-user.component';
import { TextSnapListOneUserComponent } from './text-snap-list-one-user/text-snap-list-one-user.component';
import { HomeComponent } from './home/home.component'
import {  AuthConnexionUserComponent } from './auth-connexion-user/auth-connexion-user.component'
import { AuthInscriptionUserComponent } from './auth-inscription-user/auth-inscription-user.component'


const routes: Routes = [
  { path: 'snaps/face/:id', component: FaceSnapListOneUserComponent },
  { path: 'snaps/text/:id', component: TextSnapListOneUserComponent  },
  { path: '', component:  HomeComponent },
  { path: 'connexion', component:  AuthConnexionUserComponent },
  { path: 'inscription', component:  AuthInscriptionUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
