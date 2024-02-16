import { Injectable } from '@angular/core';
import { TextSnap } from '../models/text-snap.model'

@Injectable({
  providedIn: 'root'
})
export class TextSnaps9Service {
  TextSnaps: TextSnap[] = [
        new TextSnap( 1 ,'cafe', 'J\'adore le café', new Date, 5, 1),
       new TextSnap( 2 ,"Nature", "J'adore la nature ",
          new Date, 16445, 2),
          new TextSnap( 3 ,"Architecture", "Une architecture incroyable ",
         
          new Date, 16445, 3),
    
  ];

  getAllTextSnaps(): TextSnap[] {
    return this.TextSnaps;
}

getTextSnapById(TextSnapId: number): TextSnap {
  const TextSnap = this.TextSnaps.find(TextSnap => TextSnap.id === TextSnapId);
  if (!TextSnap) {
      throw new Error('TextSnap not found!');
  } else {
      return TextSnap;
  }
} 


getTextSnapByAuteur( userId: number ): TextSnap[] {

  let TextSnap = this.TextSnaps.filter(TextSnap => TextSnap.userId == userId);

  if (!TextSnap) {
      throw new Error('FaceSnap not found!');
  } 
  return TextSnap;
}

snapTextSnapById(TextSnapId: number, snapType: 'snap' | 'unsnap'): void {
  const TextSnap = this.getTextSnapById(TextSnapId);
  snapType === 'snap' ? TextSnap.snaps++ : TextSnap.snaps--;
}

unsnapTextSnapById(TextSnapId: number): void {
  const TextSnap = this.TextSnaps.find(TextSnap => TextSnap.id === TextSnapId);
  if (TextSnap) {
      TextSnap.snaps--;
  } else {
      throw new Error('TextSnap not found!');
  }
}

}