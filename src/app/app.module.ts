import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeaderSnapComponent } from './header-snap/header-snap.component';
import { HomeComponent } from './home/home.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AuthConnexionUserComponent } from './auth-connexion-user/auth-connexion-user.component';
import { AuthInscriptionUserComponent } from './auth-inscription-user/auth-inscription-user.component';
import { Publication } from './models/publication.model';
import { PublicationAllListComponent  } from './publication-all-list/publication-all-list.component';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { PublicationComponent } from './publication/publication.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
@NgModule({
  declarations: [
    AppComponent,
    
    HeaderComponent,
    HeaderSnapComponent,
    HomeComponent,
    UsersListComponent,
    AuthConnexionUserComponent,
    AuthInscriptionUserComponent,
    PublicationComponent,
    PublicationAllListComponent,
    PublicationListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule
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