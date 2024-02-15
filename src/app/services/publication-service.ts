import { Injectable } from '@angular/core';
import { Publication } from '../models/publication.model'


@Injectable({
  providedIn: 'root'
})
export class PublicationsService {
  publications: Publication[] = [
    new Publication(1,
      'cafe',
      'J\'adore le café',
      'J\'adore le café',
      ['https://live.staticflickr.com/47/150654741_ae02588670_b.jpg',],

      new Date, 5, 5,
      "",
      ["", ""],
      ["", ""]
    ),

    new Publication(2,
      "Nature",
      "J'adore la nature ",
      "J'adore la nature ",
      ["https://img.freepik.com/photos-gratuite/champ-lavande-au-coucher-du-soleil-pres-valensole_268835-3910.jpg?size=626&ext=jpg&ga=GA1.2.337367146.1690124945&semt=sph",],
      new Date, 5,
      16445, "", ["", ""],
      ["", ""]
    ),


  ];


  getAllPublications(): Publication[] {
    return this.publications;
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