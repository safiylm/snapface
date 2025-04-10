import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InteractionSociale } from '../models/interaction.sociale.model';


@Injectable({
  providedIn: 'root'
})

export class InteractionSocialeService {

  constructor(private http: HttpClient) { }
 
  url="https://snapface.onrender.com"
  // url="http://localhost:4100"
 

  getInteractionSocialeById(id: string): Observable<InteractionSociale> {
    return this.http.get<InteractionSociale>(this.url + "/api/interactionSocialByPostId?id=" + id);
  }


  addLike(_id: string) {

    this.http
      .post(
        this.url + "/api/interaction/social/likes/add",
        { '_id': _id, 'userId': localStorage.getItem('userId') },
      ).subscribe(data => {
        if (data)
          console.log("ADD LIKE")
      })
  }

  removeLike(_id: string) {
    this.http
      .post(
        this.url + "/api/interaction/social/likes/remove",
        { '_id': _id, 'userId': localStorage.getItem('userId') },
      ).subscribe(data => {
        if (data)
          console.log("REMOVE LIKE")
      })
  }

  addPoints(_id: string, auteurId: string) {
    this.http
      .post(
        this.url + "/api/interaction/social/points/add",
        { '_id': _id, 'userId': localStorage.getItem('userId'), 'auteurId': auteurId },
      ).subscribe(data => {
        if (data)
          console.log("ADD POINT")
      })
  }

  removePoints(_id: string, auteurId: string) {
    this.http
      .post(
        this.url + "/api/interaction/social/points/remove",
        { '_id': _id, 'userId': localStorage.getItem('userId'), 'auteurId': auteurId }
      ).subscribe(data => {
        if (data)
          console.log("REMOVE POINT")
      })
  }

  addComments(_id: string, comments: number): Observable<any> {
    return this.http
      .post<any>(
        this.url + "/api/interaction/social/comments/update",
        { '_id': _id, 'comments': comments, 'userId': localStorage.getItem('userId') }
      )
  }

  checkTotalLikes(id: string): Observable<any> | void {

    this.http.get<InteractionSociale>(this.url + "/api/interactionSocialByPostId?id=" + id)
      .subscribe({
        next: (data) => {

          console.log(data.likedBy_.length + " " + data.likes)
          
          if (data.likedBy_.length  != data.likes) {
            this.http
              .post<any>(this.url + '/api/checkLikes',
               { "id": id, "likes": data.likedBy_.length },
              ).subscribe(data1 => {
                if (data1)
                console.log("like update successful")
              })
          }
        },
        error: (e) => console.error(e)
      });
  }
  

  checkTotalPoints(id: string): Observable<any> | void {

    this.http.get<InteractionSociale>(this.url + "/api/interactionSocialByPostId?id=" + id)
      .subscribe({
        next: (data) => {

          console.log(data.pointedBy_.length + " " + data.points)
          
          if (data.pointedBy_.length  != data.points) {
            this.http
              .post<any>(this.url + '/api/checkPoints'
                , { "id": id, "points": data.pointedBy_.length },
               
              ).subscribe(data1 => {
                if (data1)
                console.log("points update successful")
              })
          }
        },
        error: (e) => console.error(e)
      });
  }
}

