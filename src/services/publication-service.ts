import { Injectable } from '@angular/core';
import { Publication } from '../models/publication.model'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InteractionSociale } from '../models/interaction.sociale.model';


@Injectable({
  providedIn: 'root'
})
export class PublicationsService {
  publications: Publication[] = [
  ];

  constructor(private http: HttpClient) { }


  getAllPublications(): Promise<Publication[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        return this.http.get<Publication[]>("https://snapface.onrender.com/api/publication")
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
      return this.http.get<Publication[]>("https://snapface.onrender.com/api/publication")  
  }

  getAllPublicationsByUserId(id: string): Observable<Publication[]> {
    return this.http.get<Publication[]>("https://snapface.onrender.com/api/publicationByUserId?id=" + id);
  }

  getMyPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>("https://snapface.onrender.com/api/publicationByUserId?id=" + localStorage.getItem('userId')?.toString());
  }

  public createNewPublication(formData: Publication): Observable<Publication> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };
    return this.http
      .post<Publication>(
        `http://snapface.onrender.com/api/publication/create`,
        formData,
      )
  }


  editPost(formData: Publication): Observable<Publication> {

    return this.http
      .post<Publication>(
        `https://snapface.onrender.com/api/publication/edit`,
        formData,
      )

  }

  deletePost(id: string): Observable<any> {
    return this.http
      .post<any>(
        `https://snapface.onrender.com/api/publication/delete`,
        { "id": id },
      )
  }

  getPublicationById(PublicationId: string): Observable<Publication> {
    return this.http.get<Publication>("https://snapface.onrender.com/api/publicationid?id=" + PublicationId);

  }

  getAllPublicationsByAuteur(userId: string): Publication[] {

    let Publication = this.publications.filter(Publication => Publication.userId == userId);

    if (!Publication) {
      throw new Error('Publication not found!');
    }
    return Publication;
  }

}