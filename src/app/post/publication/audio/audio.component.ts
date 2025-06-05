import { NgIf } from '@angular/common';
import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { Publication } from 'src/models/publication.model';
import { AudioService } from 'src/services/audio.service';


@Component({
  standalone: true,
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
  imports: [NgIf,]
})


export class AudioComponent {

  @Input() publication !: Publication;
  @ViewChildren('autoAudio') audioElements!: QueryList<ElementRef<HTMLAudioElement>>;

  audiotitle !: string;
  audiourl!: string;
  audio: any;
  isPlaying = false;
  currentTime = 0;
  duration = 0;

  constructor(private audioService: AudioService) { }

  ngOnInit() {


    if (this.publication.audio != null
      && this.publication.audio != undefined
      && this.audioService.getAudioById(this.publication.audio).length != 0) {
 
      this.audiotitle = this.audioService.getAudioById(this.publication.audio)[0].title as string
      this.audiourl = '../../../../assets/audio/' + this.audioService.getAudioById(this.publication.audio)[0].url as string

      this.audio = new Audio(this.audiourl);

      this.audio.addEventListener('loadedmetadata', () => {
        this.duration = this.audio.duration;
      });

      this.audio.addEventListener('timeupdate', () => {
        this.currentTime = this.audio.currentTime;
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
      });
    }
  }


  ngAfterViewInit(): void {
    const audioObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const audio = entry.target as HTMLAudioElement;
        if (entry.isIntersecting) {
          audio.play().catch(() => { });
        } else {
          this.isPlaying = false;
          audio.pause();
        }
      });
    }, {
      threshold: 0.5
    });



    // Observer tous les audios
    this.audioElements.forEach(audioRef => {
      audioObserver.observe(audioRef.nativeElement);
    });


  }

  get Audio() {
    return (this.publication && this.publication.audio) ? this.publication.audio : null
  }



  togglePlay() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  onSeek(event: Event) {
    const input = event.target as HTMLInputElement;
    this.audio.currentTime = parseFloat(input.value);
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
}


