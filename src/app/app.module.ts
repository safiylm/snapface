import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FaceSnapComponent } from './face-snap/face-snap.component';
import * as fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { FaceSnapAllListComponent } from './face-snap-all-list/face-snap-all-list.component';
import { HeaderComponent } from './header/header.component';
import { HeaderSnapComponent } from './header-snap/header-snap.component';
import { TextSnapComponent } from './text-snap/text-snap.component';
import { HomeComponent } from './home/home.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AuthConnexionUserComponent } from './auth-connexion-user/auth-connexion-user.component';
import { AuthInscriptionUserComponent } from './auth-inscription-user/auth-inscription-user.component';
import { FaceSnapListOneUserComponent } from './face-snap-list-one-user/face-snap-list-one-user.component';
import { TextSnapAllListComponent } from './text-snap-all-list/text-snap-all-list.component';
import { TextSnapListOneUserComponent } from './text-snap-list-one-user/text-snap-list-one-user.component';




@NgModule({
  declarations: [
    AppComponent,
    FaceSnapComponent,
    FaceSnapAllListComponent,
    HeaderComponent,
    HeaderSnapComponent,
    TextSnapComponent,
    HomeComponent,
    UsersListComponent,
    AuthConnexionUserComponent,
    AuthInscriptionUserComponent,
    FaceSnapListOneUserComponent,
    TextSnapAllListComponent,
    FaceSnapAllListComponent,
    TextSnapListOneUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}