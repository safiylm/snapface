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

  constructor(private http: HttpClient) { }
  //users ?: User[];

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:4200/api/user");
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>("http://localhost:4200/api/userid?id=" + id);
  }

  public addNewStatistiqueUser(): void {
    this.http
    .post<any>(
      `http://localhost:4200/api/statistique/user/create`,
      {"id" : "798464697846"},
    ).subscribe(data => {
      console.log(" Post request subscribe data content:" + data)
    })
  }

  public  pushNewUser(formData: User): void {
 
    this.http
      .post<User>(
        `http://localhost:4200/api/user/create`,
        formData,
      ).subscribe(data => {
        console.log(" inscription post req body content :" )
        console.log( data)

      })


  }




  public connexion(email: string, password: string): void {
    this.http
      .post<string>(
        `http://localhost:4200/api/user/connexion`,
        { "email": email.toString() , "password": password.toString() },
      ).subscribe(data => {
        console.log(" Post request subscribe data content:" + data)
      })
  }

}