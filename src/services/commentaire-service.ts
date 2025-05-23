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

  url="https://snapface.onrender.com"
  // url="http://localhost:4100"
 
  getCommentaireByPostId(id: string): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>( this.url + "/api/commentairesByPostId?id=" + id);
  }

  getUserByUserId(id: string): Observable<User> {
    return this.http.get<User>(this.url + "/api/userid?id=" + id);
  }

  addNewCommentaire(formData: Commentaire): Observable<Commentaire> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http
      .post<Commentaire>(
        this.url + `/api/commentaire/create`,
        formData,
        httpOptions
      )
  }
  

  deleteCommentaire(commentId: string) : Observable<Commentaire> {
   return this.http
      .post<any>(
        this.url + "/api/commentaire/delete",
        { "id": commentId }
      )
  }

  updateCommentaire(form: Commentaire): Observable<Commentaire> {

    return this.http
      .post<Commentaire>(
        this.url + "/api/commentaire/update",
        form
      )
  }


  checkTotalComments(id: string)  {}
  

}
