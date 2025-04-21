import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Signalement } from '../models/signalement.model';


@Injectable({
  providedIn: 'root'
})

export class SignalementService {

  constructor(private http: HttpClient) { }
 
 //url="https://snapface.onrender.com"
  url="http://localhost:4100"

  signalerUnePublication(signalement: Signalement): Observable<any> {
    return this.http.post( this.url+`/create/signalement/post`,
      signalement)
  }

  signalerUnUser(signalement: Signalement): Observable<any> {
    return this.http.post( this.url+`/create/signalement/user`,
      signalement)
  }

  getAllUsersSignale():  Observable<any> {
    return this.http.get( this.url+`/signalement/alluser` )
  }

  getAllPostsSignale():  Observable<any> {
    return this.http.get( this.url+`/signalement/allpost` )
  }

  getAllPostsSignaleByAuteur(auteur: string ):  Observable<any> {
    return this.http.get( this.url+`/signalement/allpostByAuteur?auteur=`+auteur )
  }

  getAllUsersSignaleByAuteur(auteur: string ):  Observable<any> {
    return this.http.get( this.url+`/signalement/alluserByAuteur?auteur=`+auteur )
  }
}