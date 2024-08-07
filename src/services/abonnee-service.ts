import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Abonnee } from '../models/abonnee.model';


@Injectable({
  providedIn: 'root'
})

export class AbonneeService {

  constructor(private http: HttpClient) { }
 
  getAbonneeByUserId(id : string ): Observable<Abonnee[]> {
    return this.http.get<Abonnee[]>("https://snapface.onrender.com/api/abonneesbyUserId?id="+id);
  }

}
