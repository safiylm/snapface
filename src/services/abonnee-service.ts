import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Abonnee } from '../models/abonnee.model';
import { FollowRequest } from 'src/models/followrequest';
import { url } from './url'


@Injectable({
  providedIn: 'root'
})

export class AbonneeService {

  constructor(private http: HttpClient) { }


  create(userId: string, follows: string): Observable<any> {
    return this.http.post(url + `/api/abonnees/create`,
      { 'userId': userId, 'follows': follows, })
  }

  remove(userId: string, follows: string): Observable<any> {
    return this.http.post(url + `/api/abonnees/remove`,
      {
        'follows': follows,
        'userId': userId
      }
    )
  }

  getFollowersByUserId(id: string): Observable<Abonnee[]> {
    return this.http.get<Abonnee[]>(url + "/api/followers?id=" + id);
  }

  getAbonnementByUserId(id: string): Observable<Abonnee[]> {
    return this.http.get<Abonnee[]>(url + "/api/abonnement?id=" + id);
  }

  getIfDejaEnAttente(from: string, to: string): Observable<Abonnee[]> {
    return this.http.get<any>(url + "/api/dejaEnAttente?from=" + from + "&to=" + to);
  }



  findPostOfMyAbonnement(UserId: string): Observable<any> {
    return this.http.get<any>(url + "/api/post/myabonnement?id=" + UserId);
  }

  checkabonnement(UserId: string, follows: string) {
    return this.http.get<any>(url + "/api/checkabonnement?userId=" + UserId + "&follows=" + follows);
  }

  createFollowRequest(from: string, to: string) {
    return this.http.post(url + `/api/followrequest/create`,
      { 'from': from, 'to': to, })
  }

  acceptFollowRequest(_id: string) {
    return this.http.post(url + `/api/followrequest/accept`,
      { 'from': _id, 'to': localStorage.getItem("userId")?.toString() as string })
  }

  rejectFollowRequest(_id: string) {
    return this.http.post(url + `/api/followrequest/reject`,
      { 'from': _id, 'to': localStorage.getItem("userId")?.toString() as string })
  }

  renoncerFollowRequest(_id: string) {
    return this.http.post(url + `/api/followrequest/reject`,
      { 'from': localStorage.getItem("userId")?.toString() as string, 'to': _id })
  }

  getListOfFollowRequestByUserId(userId: string): Observable<FollowRequest[]> {
    return this.http.get<FollowRequest[]>(url + "/api/listOfFollowRequest?userId=" + userId);
  }


}
