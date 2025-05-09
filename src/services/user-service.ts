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

 url = "https://snapface.onrender.com"
 // url="http://localhost:4100"


  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('userId', '');
    localStorage.removeItem('userId')
    localStorage.removeItem('token');
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + "/api/user"
    );
  }

  editPhotoDeProfilViaFile(formData: FormData): Observable<any> {
    return this.http.post<{ url: string }>(
      this.url + '/api/user/edit/photodeprofil',
      formData)
  }

  editPhotoDeBackgroundViaFile(formData: FormData): Observable<any> {
    return this.http.post<{ url: string }>(
      this.url + '/api/user/edit/photobackground',
      formData)
  }


  public connexion(email: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http
      .post(
        this.url + `/api/user/connexion`,
        { "email": email },
        //  httpOptions, 
      )
  }

  public inscription(formData: User): Observable<User> {

    return this.http
      .post<User>(
        this.url + `/api/user/create`,
        formData,
      )

  }


  public editPassword(userId: string, newpassword: string): Observable<User> {
    return this.http
      .post<User>(
        this.url + `/api/user/edit/password`,
        { "_id": userId, "newpassword": newpassword },
      )
  }


  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.url + "/api/userid?id=" + id);
  }

  getMyData(): Observable<User> {
    return this.http.get<User>(this.url + "/api/userid?id=" + localStorage.getItem('userId')?.toString());
  }

  searchByName(fname: string, lname: string): Observable<User[]> {
    return this.http.get<User[]>(this.url + "/api/username?fname=" + fname + "&lname=" + lname);
  }


  getAbonneeByUserId(id: string): Observable<Abonnee[]> {
    return this.http.get<Abonnee[]>(this.url + "/api/abonneesbyUserId?id=" + id);
  }


  updateUser(formData: User): Observable<User> {
    return this.http
      .post<User>(
        this.url + `/api/user/update`,
        formData
      );
  }

  editEmail(id: string, email: string): Observable<User> {
    return this.http
      .post<User>(
        this.url + `/api/user/edit/email`,
        { "_id": id, "email": email },
      );
  }

  editPhoneNumber(id: string, phoneNo: number): Observable<User> {
    return this.http
      .post<User>(
        this.url + `/api/user/edit/phonenumber`,
        { "_id": id, "phoneNo": phoneNo },
      );
  }


  deleteUser(userId: string): void {

    this.http
      .post<User>(
        this.url + `/api/user/delete`,
        { "id": userId },
      ).subscribe(data => {
        console.log(" user delete post req body content :")
        console.log(data)
      })

  }

  getMailForChangePasswordOublie(email: string) {
    return this.http.post(this.url + "/password-oublie/email",
      { 'email': email, })
  }

  public getIfEmailExist(email: string) {

    return this.http.post(this.url + `/api/user/email`,
      { 'email': email, })
  }

  public reinitialisePassword(token: string, pwd: string) {
    return this.http.post(this.url + `/api/user/reinitialise/password`,
      { 'password': pwd, 'token': token, })
  }

/*

  editPhotoDeProfilViaLink(id: string, photo: string): Observable<any> {
    return this.http
      .post(
        this.url +
        `/api/user/edit/photodeprofilwithLink`,
        { "_id": id, "photo": photo },
      );
  }

  editPhotoDeBackgroundViaLink(id: string, photo: string): Observable<any> {
    return this.http
      .post(
        this.url +
        `/api/user/edit/photobackgroundwithLink`,
        { "_id": id, "photo": photo },
      );
  }

*/
}