import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model'

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {
  faceSnaps: FaceSnap[] = [
        new FaceSnap( 1 ,'cafe', 'J\'adore le café', 'https://live.staticflickr.com/47/150654741_ae02588670_b.jpg', new Date, 5),
       new FaceSnap( 2 ,"Nature", "J'adore la nature ",
          "https://img.freepik.com/photos-gratuite/champ-lavande-au-coucher-du-soleil-pres-valensole_268835-3910.jpg?size=626&ext=jpg&ga=GA1.2.337367146.1690124945&semt=sph",
          new Date, 16445)
    
  ];

  getAllFaceSnaps(): FaceSnap[] {
    return this.faceSnaps;
}

getFaceSnapById(faceSnapId: number): FaceSnap {
  const faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
  if (!faceSnap) {
      throw new Error('FaceSnap not found!');
  } else {
      return faceSnap;
  }
} 


snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): void {
  const faceSnap = this.getFaceSnapById(faceSnapId);
  snapType === 'snap' ? faceSnap.snaps++ : faceSnap.snaps--;
}

unsnapFaceSnapById(faceSnapId: number): void {
  const faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
  if (faceSnap) {
      faceSnap.snaps--;
  } else {
      throw new Error('FaceSnap not found!');
  }
}

}