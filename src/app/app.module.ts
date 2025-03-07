import { LOCALE_ID, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import * as fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AuthGuard } from './guards/auth.guard';
import { HashLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports : [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule ,
  ],

  providers: [AuthGuard,
    { provide:  LOCALE_ID, useValue: 'fr-FR',useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}