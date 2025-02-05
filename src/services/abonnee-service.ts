import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Abonnee } from '../models/abonnee.model';


@Injectable({
  providedIn: 'root'
})

export class AbonneeService {

  constructor(private http: HttpClient) { }
 
  url="https://snapface.onrender.com"
 //url="http://localhost:4100"

  create(userId: string, follows: string): Observable<any> {
    return this.http.post( this.url+`/api/abonnees/create`,
      { 'userId': userId, 'follows': follows, })
  }

  remove(userId: string, follows: string): Observable<any> {
    return this.http.post(this.url+`/api/abonnees/remove`,
      {
        'follows': follows,
        'userId': userId
      }
    )
  }

  getFollowersByUserId(id : string ): Observable<Abonnee[]> {
    return this.http.get<Abonnee[]>(this.url+"/api/followers?id="+id);
  }

  getAbonnementByUserId(id : string ): Observable<Abonnee[]> {
    return this.http.get<Abonnee[]>(this.url+"/api/abonnement?id="+id);
  }

  findPostOfMyAbonnement(UserId : string ): Observable<any> {
    return this.http.get<any>(this.url+"/api/post/myabonnement?id="+UserId);
  }

  checkabonnement(UserId : string, follows: string){
    return this.http.get<any>(this.url+"/api/checkabonnement?userId="+UserId+"&follows="+follows);
  }

}
