import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Abonnee } from '../models/abonnee.model';
import { Publication } from 'src/models/publication.model';


@Injectable({
  providedIn: 'root'
})

export class AbonneeService {

  constructor(private http: HttpClient) { }
 
  getFollowersByUserId(id : string ): Observable<Abonnee> {
    return this.http.get<Abonnee>("https://snapface.onrender.com/api/abonneesbyUserId?id="+id);
  }

  getAbonnementByUserId(id : string ): Observable<Abonnee> {
    return this.http.get<Abonnee>("https://snapface.onrender.com/api/abonneesbyUserId?id="+id);
  }

  findPostOfMyAbonnement(UserId : string ): Observable<any> {
    return this.http.get<any>("http://localhost:4100/api/post/myabonnement?id="+UserId);
  }


}
