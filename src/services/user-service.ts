import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Abonnee } from '../models/abonnee.model';
import { url } from './url'


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient, public router: Router) { }

  logout(): Observable<any> {
    return this.http.get(url + "/logout")
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(url + "/api/user"
    );
  }

  editPhotoDeProfilViaFile(formData: FormData): Observable<any> {
    return this.http.post<{ url: string }>(
      url + '/api/user/edit/photodeprofil',
      formData)
  }

  editPhotoDeBackgroundViaFile(formData: FormData): Observable<any> {
    return this.http.post<{ url: string }>(
      url + '/api/user/edit/photobackground',
      formData)
  }


  public connexion(email: string, password:string ): Observable<any> {

    return this.http
      .post(
        url + `/api/user/connexion`,
        { "email": email, "password": password },
          {  withCredentials: true
         },
      )
  }

  public inscription(formData: User): Observable<any> {
    return this.http
      .post<any>(
        url + `/api/user/create`,
        formData,
      )
  }


  public editPassword(userId: string, newpassword: string): Observable<User> {
    return this.http
      .post<User>(
        url + `/api/user/edit/password`,
        { "_id": userId, "newpassword": newpassword },
      )
  }


  getUser(id: string): Observable<User> {
    return this.http.get<User>(url + "/api/userid?id=" + id);
  }

  getMyData(): Observable<User> {
    return this.http.get<User>(url + "/api/userid?id=" +
       JSON.parse(localStorage.getItem('userconnected')?.toString() as string).userId     );
  }

  searchByName(fname: string, lname: string): Observable<User[]> {
    return this.http.get<User[]>(url + "/api/username?fname=" + fname + "&lname=" + lname);
  }


  getAbonneeByUserId(id: string): Observable<Abonnee[]> {
    return this.http.get<Abonnee[]>(url + "/api/abonneesbyUserId?id=" + id);
  }


  updateUser(formData: User): Observable<User> {
    return this.http
      .post<User>(
        url + `/api/user/update`,
        formData
      );
  }

  editEmail(id: string, email: string): Observable<User> {
    return this.http
      .post<User>(
        url + `/api/user/edit/email`,
        { "_id": id, "email": email },
      );
  }

  editPhoneNumber(id: string, phoneNo: number): Observable<User> {
    return this.http
      .post<User>(
        url + `/api/user/edit/phonenumber`,
        { "_id": id, "phoneNo": phoneNo },
      );
  }


  deleteUser(userId: string): void {

    this.http
      .get<User>(
        url + `/api/user/delete`,
        //{ "id": userId },
      )

  }

  getMailForChangePasswordOublie(email: string) {
    return this.http.post(url + "/password-oublie/email",
      { 'email': email, })
  }

  public getIfEmailExist(email: string) {

    return this.http.post(url + `/api/user/email`,
      { 'email': email, })
  }

  public reinitialisePassword(token: string, pwd: string) {
    return this.http.post(url + `/api/user/reinitialise/password`,
      { 'password': pwd, 'token': token, })
  }

 
}