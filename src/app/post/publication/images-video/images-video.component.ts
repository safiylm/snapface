import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  standalone: true,
  selector: 'app-images-video',
  templateUrl: './images-video.component.html',
  styleUrls: ['./images-video.component.scss'],
  imports: [NgIf, CommonModule],
     animations: [
      trigger('fadeImage', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('1000ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('2000ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ])
    ]
})

export class ImagesVideoComponent {

  @Input() assets !: string[];
  index: number = 0;
  show = true;


  displayImageNext() {
    if (this.index < this.assets.length - 1) {
      this.index ++ ;
    }
    else {
      this.index = 0;
    }
  }

  displayImagePrecedent() {
    if (this.index > 0)
      this.index -= 1;
  }

  isImage(url: string): boolean {
    return url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) !== null;
  }

  isVideo(url: string): boolean {
    return url.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i) !== null;
  }


  get Assets() {
    return (this.assets) ? this.assets : null
  }

}
