import { Injectable } from '@angular/core';
import { Publication } from '../models/publication.model'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from './url'


@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  constructor(private http: HttpClient) { }


  getAllPublications(): Promise<Publication[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        return this.http.get<Publication[]>(url + "/api/publication")
          .subscribe(response => {
            resolve(response)
          }, err => {
            console.log(err.message);
          }, () => {
            console.log('completed');
          }
          );
      }, 1000);
    })
  }


  getAllPublications_(): Observable<Publication[]> {   
      return this.http.get<Publication[]>(url + "/api/publication")  
  }

  
  getAllPublicationsPourMoi(): Observable<Publication[]> {   
      return this.http.get<Publication[]>(url + "/api/pour-moi/publication?userId="+localStorage.getItem('userId')?.toString())  
  }
  

  getAllPublicationsByUserId(id: string): Observable<Publication[]> {
    return this.http.get<Publication[]>(url + "/api/publicationByUserId?id=" + id);
  }

  getMyPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(url + "/api/publicationByUserId?id=" + localStorage.getItem('userId')?.toString());
  }

  public createNewPublication(formData: any): Observable<any> {
   
    return this.http
      .post(
        url + `/api/publication/create`,
        formData,
      )
  }


  editPost(formData: any): Observable<any> {
    return this.http
      .post(
        url + `/api/publication/edit`,
        formData,
      )
  }

  deletePost(id: string): Observable<any> {
    return this.http
      .post<any>(
        url + `/api/publication/delete`,
        { "id": id },
      )
  }

  getPublicationById(PublicationId: string): Observable<Publication> {
    return this.http.get<Publication>(url + "/api/publicationid?id=" + PublicationId);

  }

  searchByTitle(name : string): Observable<Publication[]> {
    return this.http.get<Publication[]>(url + "/api/publication/search?name=" + name);

  }



}