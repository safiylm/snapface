import { Injectable } from '@angular/core';
import { Publication } from '../models/publication.model'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

  getAllPublicationsByUserId(id: string): Observable<Publication[]> {
    return this.http.get<Publication[]>("https://snapface.onrender.com/api/publicationByUserId?id=" + id);
  }

  public createNewPublication(formData: Publication): void {

    this.http
      .post<Publication>(
        `https://snapface.onrender.com/api/publication/create`,
        formData,
      ).subscribe(data => {
        console.log("Add new post ")
      })
  }



  editPost(formData: Publication): void {

    this.http
      .post<Publication>(
        `https://snapface.onrender.com/api/publication/edit`,
        formData,
      ).subscribe(data => {
        if (data)
          console.log("Post edited")
      })

  }

  deletePost(id: string): void {
    this.http
      .post<any>(
        `https://snapface.onrender.com/api/publication/delete`,
        { "id": id },
      ).subscribe(data => {
        console.log(" publication delete post req body content :")
        console.log(data)
      })
  }

  getPublicationById(PublicationId: string): Observable<Publication> {
    return this.http.get<Publication>("https://snapface.onrender.com/api/publicationByPostId?postId=" + PublicationId);

  }

  getAllPublicationsByAuteur(userId: string): Publication[] {

    let Publication = this.publications.filter(Publication => Publication.userId == userId);

    if (!Publication) {
      throw new Error('Publication not found!');
    }
    return Publication;
  }




  snapPublicationById(PublicationId: string, snapType: 'snap' | 'unsnap'): void {
    const Publication = this.getPublicationById(PublicationId);
    // snapType === 'snap' ? Publication.snaps++ : Publication.snaps--;
  }

  unsnapPublicationById(PublicationId: string): void {
    const Publication = this.publications.find(Publication => Publication._id === PublicationId);
    if (Publication) {
      //  Publication.snaps--;
    } else {
      throw new Error('Publication not found!');
    }
  }

}