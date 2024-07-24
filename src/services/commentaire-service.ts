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
    return this.http.get<Commentaire[]>("https://snapface.onrender.com/api/commentairesByPostId?id="+id);
  }

  getUserByUserId(id : string ): Observable<User> {
    return this.http.get<User>("https://snapface.onrender.com/api/userid?id="+id);
  }

  addNewCommentaire(formData: Commentaire ){

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
      })
    };

    this.http
      .post<Commentaire>(
        `https://snapface.onrender.com/api/commentaire/create`,
        formData,
        httpOptions
        
      ).subscribe(data => {
        if(data)
        console.log("Commentaire created" )

      })
    
  }

  deleteCommentaire( commentId: string ){
    this.http
    .post<any>(
      "https://snapface.onrender.com/api/commentaire/delete",
      {"id" : commentId }
    ).subscribe(data => {
      if(data)
        console.log("Commentaire deleted" )
    })
  }

  updateCommentaire( form: Commentaire) {

    return this.http
    .post<Commentaire>(
      `https://snapface.onrender.com/api/commentaire/update`,
      form
    ).subscribe(data => {
      if(data)
        console.log("Commentaire edited" )
    })
  }

}
