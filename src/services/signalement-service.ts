import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Signalement } from '../models/signalement.model';
import { url } from './url'


@Injectable({
  providedIn: 'root'
})

export class SignalementService {

  constructor(private http: HttpClient) { }


  signalerUnePublication(signalement: Signalement): Observable<any> {
    return this.http.post( url+`/create/signalement/post`,
      signalement)
  }

  signalerUnUser(signalement: Signalement): Observable<any> {
    return this.http.post( url+`/create/signalement/user`,
      signalement)
  }

  getAllUsersSignale():  Observable<any> {
    return this.http.get( url+`/signalement/alluser` )
  }

  getAllPostsSignale():  Observable<any> {
    return this.http.get( url+`/signalement/allpost` )
  }

  getAllPostsSignaleByAuteur(auteur: string ):  Observable<any> {
    return this.http.get( url+`/signalement/allpostByAuteur?auteur=`+auteur )
  }

  getAllUsersSignaleByAuteur(auteur: string ):  Observable<any> {
    return this.http.get( url+`/signalement/alluserByAuteur?auteur=`+auteur )
  }
}