import { Injectable } from '@angular/core';
import {
  HttpClientModule, HttpClient, HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { InteractionSociale } from '../models/interaction.sociale.model';



@Injectable({
  providedIn: 'root'
})

export class InteractionSocialeService {

  constructor(private http: HttpClient) { }
 
  getInteractionSocialeById(id : string ): Observable<InteractionSociale> {
    return this.http.get<InteractionSociale>("http://localhost:4200/api/interactionSocialByPostId?id="+id);
  }




}

