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


  addLike(_id:string , likes: number) {

     this.http
     .post(
       `https://snapface.onrender.com/api/interaction/social/likes/add`,
       {'_id': _id, 'likes': likes, 'userId' : localStorage.getItem('userId') }, 
     ).subscribe(data => {
      if(data)
        console.log("ADD LIKE" )
    })
  }

  removeLike(_id:string , likes: number) {
   this.http
    .post(
      `https://snapface.onrender.com/api/interaction/social/likes/remove`,
      {'_id': _id, 'likes': likes, 'userId' : localStorage.getItem('userId')},
    ).subscribe(data => {
      if(data)
        console.log("REMOVE LIKE" )
    })
  }

  addPoints(_id:string , points: number) {
    this.http
    .post(
      `https://snapface.onrender.com/api/interaction/social/points/add`,
      {'_id': _id, 'points': points, 'userId' : localStorage.getItem('userId')},
    ).subscribe(data => {
      if(data)
        console.log("ADD POINT" )
    })
  }

  removePoints(_id:string , points: number){
    this.http
    .post(
      `https://snapface.onrender.com/api/interaction/social/points/remove`,
      {'_id': _id, 'points': points, 'userId' : localStorage.getItem('userId')}
    ).subscribe(data => {
      if(data)
        console.log("REMOVE POINT" )
    })
  }



  addComments(_id:string , comments: number):Observable<any> {
    return this.http
    .post<any>(
      `https://snapface.onrender.com/api/interaction/social/comments/update`,
      {'_id': _id, 'comments': comments , 'userId' : localStorage.getItem('userId')}
    )
  }

}

