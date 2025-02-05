import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Abonnee } from '../models/abonnee.model';


@Injectable({
  providedIn: 'root'
})

export class AbonneeService {

  constructor(private http: HttpClient) { }
 
  create(userId: string, follows: string): Observable<any> {
    return this.http.post(`http://localhost:4100/api/abonnees/create`,
      { 'userId': userId, 'follows': follows, })

  }

  remove(userId: string, follows: string): Observable<any> {

    return this.http.post(`http://localhost:4100/api/abonnees/remove`,
      {
        'follows': follows,
        'userId': userId
      }
    )
  }

  getFollowersByUserId(id : string ): Observable<Abonnee[]> {
    return this.http.get<Abonnee[]>("http://localhost:4100/api/followers?id="+id);
  }

  getAbonnementByUserId(id : string ): Observable<Abonnee[]> {
    return this.http.get<Abonnee[]>("http://localhost:4100/api/abonnement?id="+id);
  }

  findPostOfMyAbonnement(UserId : string ): Observable<any> {
    return this.http.get<any>("http://localhost:4100/api/post/myabonnement?id="+UserId);
  }

  checkabonnement(UserId : string, follows: string){
    return this.http.get<any>("http://localhost:4100/api/checkabonnement?userId="+UserId+"&follows="+follows);

  }

}
