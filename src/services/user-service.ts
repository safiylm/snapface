import { Injectable } from '@angular/core';
import {
  HttpClientModule, HttpClient, HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, async, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Abonnee } from '../models/abonnee.model';

//http://localhost:4200/api/user

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient, public router: Router) { }


  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('userId', '');
    localStorage.removeItem('userId')
    localStorage.removeItem('token');
  }
  //users ?: User[];

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>("https://snapface.onrender.com/api/user"
    );
  }


  public connexion(email: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
      })
    };

    return this.http
      .post(
        `https://snapface.onrender.com/api/user/connexion`,
        { "email": email },
        //  httpOptions, 
       )
  }

  public inscription(formData: User): void {

    this.http
      .post<User>(
        `https://snapface.onrender.com/api/user/create`,
        formData,
      ).subscribe(data => {
        console.log("Inscription success")
      })
      
  }


  getUser(id: string): Observable<User> {
    return this.http.get<User>("https://snapface.onrender.com/api/userid?id=" + id);
  }

  addAbonnee(userSuiviId: string) {
    if (userSuiviId != null) {
      this.http.post(`https://snapface.onrender.com/api/abonnees/abonneeAdd`,
        { 'userSuiviId': userSuiviId, 'userConnectedId': localStorage.getItem('userId')?.toString() as string, })
        .subscribe(data => {
          console.log("S'ABONNER")          
        })
    }
  }

  removeAbonnee(userSuiviId: string) {

    if (userSuiviId != null) {
      this.http.post(`https://snapface.onrender.com/api/abonnees/abonneeRemove`,
        { 'userConnectedId': localStorage.getItem('userId')?.toString() as string, 'userSuiviId': userSuiviId }
      ).subscribe(data => {
        console.log("SE DESABONNER")
      })
    }

  }



  getAbonneeByUserId(id: string): Observable<Abonnee[]> {
    return this.http.get<Abonnee[]>("https://snapface.onrender.com/api/abonneesbyUserId?id=" + id);
  }




  updateUser(formData: User): void {

    this.http
      .post<User>(
        `https://snapface.onrender.com/api/user/update`,
        formData,
      ).subscribe(data => {
        console.log(" user update post req body content :")
        console.log(data)
      })

  }


  deleteUser(userId: string): void {

    this.http
      .post<User>(
        `https://snapface.onrender.com/api/user/delete`,
        { "id": userId },
      ).subscribe(data => {
        console.log(" user delete post req body content :")
        console.log(data)
      })

  }






}