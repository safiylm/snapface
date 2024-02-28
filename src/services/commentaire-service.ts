import { Injectable } from '@angular/core';
import {
  HttpClientModule, HttpClient, HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Commentaire } from '../models/commentaire.model';
import { User } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})

export class CommentaireService {

  constructor(private http: HttpClient) { }
 
  getCommentaireByPostId(id : string ): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>("http://localhost:4200/api/commentairesByPostId?id="+id);
  }

  getUserByUserId(id : string ): Observable<User> {
    return this.http.get<User>("http://localhost:4200/api/userid?id="+id);
  }

  addNewCommentaire(formData: Commentaire ){
    
    this.http
      .post<Commentaire>(
        `http://localhost:4200/api/commentaire/create`,
        formData,
      ).subscribe(data => {
        console.log(" inscription post req body content :" )
        console.log( data)

      })
  }

  deleteCommentaire( commentId: string ){
    this.http
    .post<any>(
      `http://localhost:4200/api/commentaire/delete`,
      {"id" : commentId },
    ).subscribe(data => {
      console.log(" delete comment post req body content :" )
      console.log( data)

    })
  }

  updateCommentaire( form: Commentaire ){
    this.http
    .post<Commentaire>(
      `http://localhost:4200/api/commentaire/update`,
      form,
    ).subscribe(data => {
      console.log(" delete comment post req body content :" )
      console.log( data)

    })
  }



}
