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
    return this.http.get<InteractionSociale>("https://snapface.onrender.com/api/interactionSocialByPostId?id="+id);
  }

  addLike(_id:string , likes: number){

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
      })
    };

    return this.http
    .put(
      `https://snapface.onrender.com/api/interaction/social/likes/add`,
      {'_id': _id, 'likes': likes, 'userId' : localStorage.getItem('userId')?.toString() as string },
      httpOptions
    )
  }

  removeLike(_id:string , likes: number){
    this.http
    .put(
      `https://snapface.onrender.com/api/interaction/social/likes/remove`,
      {'_id': _id, 'likes': likes, 'userId' : localStorage.getItem('userId')?.toString() as string},
    ).subscribe(data => {
      console.log(" interactionSocial post req body content :" )
    })
  }

  addPoints(_id:string , points: number){
    this.http
    .put(
      `https://snapface.onrender.com/api/interaction/social/points/add`,
      {'_id': _id, 'points': points, 'userId' : "65cd023efb273094193ac038"},
    ).subscribe(data => {
      console.log(" interactionSocial post req body content :" )

    })
  }

  removePoints(_id:string , points: number){
    this.http
    .put(
      `https://snapface.onrender.com/api/interaction/social/points/remove`,
      {'_id': _id, 'points': points, 'userId' : "65cd023efb273094193ac038"}
    ).subscribe(data => {
      console.log(" interactionSocial post req body content :" )

    })
  }



  addComments(_id:string , comments: number){
    this.http
    .post<any>(
      `https://snapface.onrender.com/api/interaction/social/comments/update`,
      {'_id': _id, 'comments': comments , 'userId' : "65cd023efb273094193ac038"}
    ).subscribe(data => {
      console.log(" interactionSocial post req body content :" )

    })
  }





}

