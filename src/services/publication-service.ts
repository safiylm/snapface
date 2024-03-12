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


  getAllPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>("http://localhost:4200/api/publication");
  }

  getAllPublicationsByUserId( id :string): Observable<Publication[]> {
    return this.http.get<Publication[]>("http://localhost:4200/api/publicationByUserId?id="+id);
  }

  public  createNewPublication(formData: Publication): void {
 
    this.http
      .post<Publication>(
        `http://localhost:4200/api/publication/create`,
        formData,
      ).subscribe(data => {
        console.log("Add new post " )
      })


  }
  
  addNewInteractionSociale(formData: InteractionSociale ){
    
    this.http
      .post<InteractionSociale>(
        `http://localhost:4200/api/interaction/social/create`,
        formData,
      ).subscribe(data => {
        console.log(" interactionSocial post req body content :" )

      })
  }


  getAllPublicationsByAuteur(userId: string): Publication[] {

    let Publication = this.publications.filter(Publication => Publication.userId == userId);

    if (!Publication) {
      throw new Error('Publication not found!');
    }
    return Publication;
  }

  getPublicationById(PublicationId: string): Publication {
    const Publication = this.publications.find(Publication => Publication._id === PublicationId);
    if (!Publication) {
      throw new Error('Publication not found!');
    } else {
      return Publication;
    }
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