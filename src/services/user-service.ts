import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Abonnee } from '../models/abonnee.model';


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

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>("https://snapface.onrender.com/api/user"
    );
  }


  public connexion(email: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http
      .post(
        `https://snapface.onrender.com/api/user/connexion`,
        { "email": email },
        //  httpOptions, 
      )
  }

  public inscription(formData: User): Observable<User> {

    return this.http
      .post<User>(
        `https://snapface.onrender.com/api/user/create`,
        formData,
      )

  }


  public editPassword(userId: string, newpassword: string): Observable<User> {
    return this.http
      .post<User>(
        `https://snapface.onrender.com/api/user/edit/password`,
        { "_id": userId, "newpassword": newpassword },
      )
  }


  getUser(id: string): Observable<User> {
    return this.http.get<User>("https://snapface.onrender.com/api/userid?id=" + id);
  }

  getMyData(): Observable<User> {
    return this.http.get<User>("https://snapface.onrender.com/api/userid?id=" + localStorage.getItem('userId')?.toString());
  }

  addAbonnee(userId: string, follower: string): Observable<any> {
    return this.http.post(`http://localhost:4100/api/abonnees/add`,
      { 'userId': userId, 'follower': follower, })

  }

  removeAbonnee(userId: string, follower: string): Observable<any> {

    return this.http.post(`http://localhost:4100/api/abonnees/remove`,
      {
        'follower': follower,
        'userId': userId
      }
    )
  }


  getAbonneeByUserId(id: string): Observable<Abonnee[]> {
    return this.http.get<Abonnee[]>("https://snapface.onrender.com/api/abonneesbyUserId?id=" + id);
  }


  updateUser(formData: User): Observable<User> {
    return this.http
      .post<User>(
        `https://snapface.onrender.com/api/user/update`,
        formData
      );
  }

  editEmail(id: string, email: string): Observable<User> {
    return this.http
      .post<User>(
        `https://snapface.onrender.com/api/user/edit/email`,
        { "_id": id, "email": email },
      );
  }

  editPhoneNumber(id: string, phoneNo: number): Observable<User> {
    return this.http
      .post<User>(
        `https://snapface.onrender.com/api/user/edit/phonenumber`,
        { "_id": id, "phoneNo": phoneNo },
      );
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

  getMailForChangePasswordOublie(email: string) {
    return this.http.post("https://snapface.onrender.com/password-oublie/email",
      { 'email': email, })
  }

  public getIfEmailExist(email: string) {

    return this.http.post(`https://snapface.onrender.com/api/user/email`,
      { 'email': email, })
  }

  public reinitialisePassword(token: string, pwd: string) {
    return this.http.post(`https://snapface.onrender.com/api/user/reinitialise/password`,
      { 'password': pwd, 'token': token, })
  }


}