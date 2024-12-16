import { Injectable } from '@angular/core';
import {
  HttpClient, HttpHeaders
} from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { Commentaire } from '../models/commentaire.model';
import { User } from '../models/user.model';
import { InteractionSociale } from '../models/interaction.sociale.model';
import { LocalizedString } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class CommentaireService {

  constructor(private http: HttpClient) { }

  getCommentaireByPostId(id: string): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>("https://snapface.onrender.com/api/commentairesByPostId?id=" + id);
  }

  getUserByUserId(id: string): Observable<User> {
    return this.http.get<User>("https://snapface.onrender.com/api/userid?id=" + id);
  }

  addNewCommentaire(formData: Commentaire) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };

    this.http
      .post<Commentaire>(
        `https://snapface.onrender.com/api/commentaire/create`,
        formData,
        httpOptions

      ).subscribe(data => {
        if (data)
          console.log("Commentaire created")

      })

  }

  deleteCommentaire(commentId: string) {
    this.http
      .post<any>(
        "https://snapface.onrender.com/api/commentaire/delete",
        { "id": commentId }
      ).subscribe(data => {
        if (data)
          console.log("Commentaire deleted")
      })
  }

  updateCommentaire(form: Commentaire) {

    return this.http
      .post<Commentaire>(
        `https://snapface.onrender.com/api/commentaire/update`,
        form
      ).subscribe(data => {
        if (data)
          console.log("Commentaire edited")
      })
  }

  test(id: string): Observable<any> | void {
    
    this.http.get<Commentaire[]>("https://snapface.onrender.com/api/commentairesByPostId?id=" + id)
      .subscribe({
        next: (data) => {
          this.http.get<InteractionSociale>("https://snapface.onrender.com/api/interactionSocialByPostId?id=" + id)
            .subscribe({
              next: (data1) => {
                if (data.length != data1.comments) {
                  console.log(data.length + " != " + data1.comments)
                  localStorage.setItem("totalComments", String(data.length))
                }
              },
              error: (e) => console.error(e)
            })
        },
        error: (e) => console.error(e)
      });

    if (localStorage.getItem("totalComments") != null) {
      this.http
        .post<any>('http://localhost:4100/api/interaction/social/comments/update/commenttotal'
          , { "id": id, "comments": localStorage.getItem("totalComments") },
          {
            headers: new HttpHeaders({
              'Access-Control-Allow-Origin': '*',
            })
          }
        ).subscribe(data => {
          if (data)
            console.log("Commentaire created")
          console.log(localStorage.getItem('totalComments'))
          localStorage.removeItem('totalComments');
        })


    }

  }

}
