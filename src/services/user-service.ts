import { Injectable } from '@angular/core';
import {
  HttpClientModule, HttpClient, HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, async, throwError } from 'rxjs';
import { User } from '../models/user.model';

//http://localhost:4200/api/user

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
  }
  //users ?: User[];

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:4200/api/user");
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>("http://localhost:4200/api/userid?id=" + id);
  }

  addAbonnee(userId_: string) {
    this.http.post<any>(`http://localhost:4200/api/abonnees/abonneeAdd`,
      { 'userId_': userId_ }).subscribe(data => {
        console.log(" add abonne post req body content :")
        console.log(data)
      })
  }

  removeAbonnee(userId_: string) {
    this.http.post<any>(`http://localhost:4200/api/abonnees/abonneeRemove`,

      { 'userId_': userId_ }).subscribe(data => {
        console.log(" remove abonnee  post req body content :")
        console.log(data)
      })

  }


  public pushNewUser(formData: User): void {

    this.http
      .post<User>(
        `http://localhost:4200/api/user/create`,
        formData,
      ).subscribe(data => {
        console.log(" inscription post req body content :")
        console.log(data)
      })

  }

  updateUser(formData: User): void {

    this.http
      .post<User>(
        `http://localhost:4200/api/user/update`,
        formData,
      ).subscribe(data => {
        console.log(" user update post req body content :")
        console.log(data)
      })

  }


  deleteUser(userId: string): void {

    this.http
      .post<User>(
        `http://localhost:4200/api/user/delete`,
        { "id": userId },
      ).subscribe(data => {
        console.log(" user delete post req body content :")
        console.log(data)
      })

  }



  public connexion(email: string, password: string): any {


    this.http
      .post(
        `http://localhost:4200/api/user/connexion`,
        { "email": email, "password": password }, 
         { observe: 'response', responseType: 'text' }
      ).subscribe((data) => {
      
        if (data.body != undefined) {
          localStorage.setItem('isLoggedIn', "true");
         localStorage.setItem('userdata', data.body );  
        }
      })
    
  }



}