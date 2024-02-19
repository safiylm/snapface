import { Injectable } from '@angular/core';
import {
  HttpClientModule, HttpClient, HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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

  getUser(id : string ): Observable<User> {
    return this.http.get<User>("http://localhost:4200/api/userid?id="+id);
  }

  pushNewUser(newuser: User): void {
   // this.User.push(newuser);
    console.log("user cree")
}

}
