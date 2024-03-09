import { Injectable } from '@angular/core';
import {
  HttpClientModule, HttpClient, HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, async, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Abonnee } from '../models/abonnee.model';

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
        { "id": "798464697846" },
      ).subscribe(data => {
        console.log(" Post request subscribe data content:" + data)
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

  addNewAbonnee(formData: Abonnee) {
    this.http
      .post<Abonnee>(
        `http://localhost:4200/api/abonnees/create`,
        formData,
      ).subscribe(data => {
        console.log(" abonnees post req body content :")
        console.log(data)
      })
  }

  public connexion(email: string, password: string): void {
    console.log("email : " + email + " password : " + password)
    this.http
      .post<any>(
        `http://localhost:4200/api/user/connexion`,
        { "email": email, "password": password },
      ).subscribe(data => {
        console.log(" Post request subscribe data content:" + data.toString())
      })

  }

}