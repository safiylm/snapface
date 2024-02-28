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

  addLike(_id:string , likes: number){
    this.http
    .post<any>(
      `http://localhost:4200/api/interaction/social/likes/update`,
      {'_id': _id, 'likes': likes},
    ).subscribe(data => {
      console.log(" interactionSocial post req body content :" )

    })
  }

  addPoints(_id:string , points: number){
    this.http
    .post<any>(
      `http://localhost:4200/api/interaction/social/points/update`,
      {'_id': _id, 'points': points},
    ).subscribe(data => {
      console.log(" interactionSocial post req body content :" )

    })
  }

  addComments(_id:string , comments: number){
    this.http
    .post<any>(
      `http://localhost:4200/api/interaction/social/comments/update`,
      {'_id': _id, 'comments': comments},
    ).subscribe(data => {
      console.log(" interactionSocial post req body content :" )

    })
  }


}

