import { Injectable } from '@angular/core';
import {
  HttpClientModule, HttpClient, HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StatistiqueUser } from '../models/statistique.user.model';



@Injectable({
  providedIn: 'root'
})

export class StatistiqueUserService {

  constructor(private http: HttpClient) { }
 
  getStatistiqueUserById(id : string ): Observable<StatistiqueUser> {
    return this.http.get<StatistiqueUser>("http://localhost:4200/api/statistiqueUserByUserId?id="+id);
  }




}

