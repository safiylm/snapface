import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
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
    changeDetection: ChangeDetectionStrategy.OnPush,
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
 // index: number = 0;
  show = true;
 // link = "https://videos.pexels.com/video-files/27500382/12154558_1080_1920_30fps.mp4"
  @ViewChild('videoPlayer') videoRef !: ElementRef<HTMLVideoElement>;
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  video !: HTMLVideoElement//= this.videoRef.nativeElement;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cdRef.detectChanges(); // << Solution ici


    if (this.assets != null
      && this.assets != undefined &&
      this.isVideo(this.assets[0])) {
    this.video = this.videoRef.nativeElement;

      this.video.addEventListener('loadedmetadata', () => {
        this.duration = this.video.duration;
      });

      this.video.addEventListener('timeupdate', () => {
        this.currentTime = this.video.currentTime;
      });

      this.video.addEventListener('ended', () => {
        this.isPlaying = false;

      });
    }
  }

  // displayImageNext() {
  //   if (this.index < this.assets.length - 1) {
  //     this.index++;
  //   }
  //   else {
  //     this.index = 0;
  //   }
  // }

  // displayImagePrecedent() {
  //   if (this.index > 0)
  //     this.index -= 1;
  // }

  isImage(url: string): boolean {
    return url.match(/^(data:image)|.*\.(jpeg|jpg|gif|png|webp|svg)$/i) !== null;
  }

  isVideo(url: string): boolean {
    return url.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i) !== null;
  }


  get Assets() {
    return (this.assets) ? this.assets : null
  }


  togglePlay() {
    const video = this.videoRef.nativeElement;
    if (this.isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    this.isPlaying = !this.isPlaying;
  }


  onSeek(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    this.videoRef.nativeElement.currentTime = value;
    this.currentTime = value;
  }


  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }


}
