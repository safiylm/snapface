import { Injectable } from '@angular/core';
import {
  HttpClient, HttpHeaders
} from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { Commentaire } from '../models/commentaire.model';
import { User } from '../models/user.model';
import { InteractionSociale } from '../models/interaction.sociale.model';
import { LocalizedString } from '@angular/compiler';
import { url } from './url'

@Injectable({
  providedIn: 'root'
})

export class CommentaireService {

  constructor(private http: HttpClient) { }

  getCommentaireByPostId(id: string): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>( url + "/api/commentairesByPostId?id=" + id);
  }

  getUserByUserId(id: string): Observable<User> {
    return this.http.get<User>(url + "/api/userid?id=" + id);
  }

  addNewCommentaire(formData: Commentaire): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http
      .post<any>(
        url + `/api/commentaire/create`,
        formData,
        httpOptions
      )
  }
  

  deleteCommentaire(commentId: string, postId: string ) : Observable<Commentaire> {
   return this.http
      .post<any>(
        url + "/api/commentaire/delete",
        { "id": commentId , "postId": postId}
      )
  }

  updateCommentaire(form: Commentaire): Observable<Commentaire> {

    return this.http
      .post<Commentaire>(
        url + "/api/commentaire/update",
        form
      )
  }


  checkTotalComments(id: string)  {}
  

}
