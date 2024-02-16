import { Injectable } from '@angular/core';
import { Publication } from '../models/publication.model'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


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


  pushNewPublication(fs: Publication): void {
    this.publications.push(fs);
  }

  getAllPublicationsByAuteur(userId: number): Publication[] {

    let Publication = this.publications.filter(Publication => Publication.userId == userId);

    if (!Publication) {
      throw new Error('Publication not found!');
    }
    return Publication;
  }

  getPublicationById(PublicationId: number): Publication {
    const Publication = this.publications.find(Publication => Publication.id === PublicationId);
    if (!Publication) {
      throw new Error('Publication not found!');
    } else {
      return Publication;
    }
  }


  snapPublicationById(PublicationId: number, snapType: 'snap' | 'unsnap'): void {
    const Publication = this.getPublicationById(PublicationId);
    snapType === 'snap' ? Publication.snaps++ : Publication.snaps--;
  }

  unsnapPublicationById(PublicationId: number): void {
    const Publication = this.publications.find(Publication => Publication.id === PublicationId);
    if (Publication) {
      Publication.snaps--;
    } else {
      throw new Error('Publication not found!');
    }
  }

}