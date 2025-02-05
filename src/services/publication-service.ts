import { Injectable } from '@angular/core';
import { Publication } from '../models/publication.model'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InteractionSociale } from '../models/interaction.sociale.model';


@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  constructor(private http: HttpClient) { }

  url="https://snapface.onrender.com"
  //url="http://localhost:4100"
 
  getAllPublications(): Promise<Publication[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        return this.http.get<Publication[]>(this.url + "/api/publication")
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
      return this.http.get<Publication[]>(this.url + "/api/publication")  
  }

  getAllPublicationsByUserId(id: string): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.url + "/api/publicationByUserId?id=" + id);
  }

  getMyPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.url + "/api/publicationByUserId?id=" + localStorage.getItem('userId')?.toString());
  }

  public createNewPublication(formData: Publication): Observable<Publication> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };
    return this.http
      .post<Publication>(
        this.url + `/api/publication/create`,
        formData,
      )
  }


  editPost(formData: Publication): Observable<Publication> {

    return this.http
      .post<Publication>(
        this.url + `/api/publication/edit`,
        formData,
      )
  }

  deletePost(id: string): Observable<any> {
    return this.http
      .post<any>(
        this.url + `/api/publication/delete`,
        { "id": id },
      )
  }

  getPublicationById(PublicationId: string): Observable<Publication> {
    return this.http.get<Publication>(this.url + "/api/publicationid?id=" + PublicationId);

  }



}