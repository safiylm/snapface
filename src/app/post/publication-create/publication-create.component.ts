import { Component, OnInit } from '@angular/core';
import { Publication } from '../../../models/publication.model';
import { FormsModule } from "@angular/forms";
import { PublicationsService } from '../../../services/publication-service';
import { CommonModule, NgFor } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { AudioService } from 'src/services/audio.service';
import { LoadingSpinnerComponent } from 'src/app/loading-spinner/loading-spinner.component';

@Component({
  standalone: true,
  selector: 'app-publication-create',
  templateUrl: './publication-create.component.html',
  styleUrls: ['./publication-create.component.scss'],
  imports: [FormsModule, NgFor, CommonModule, LoadingSpinnerComponent, HeaderComponent]
})


export class PublicationCreateComponent implements OnInit {

  post = new Publication("", "", [''], "", "", 0, 0, 0, 0, 0, null, null, null, null);
  array_assets !: string[];
  newasset !: string;

  result !: any;
  loading = false;
  error = '';

  selectedFiles: File[] = [];
  audioList: any;
  constructor(private publicationsService: PublicationsService, private audioService: AudioService) { }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.selectedFiles = Array.from(input.files);
    // this.previewUrls = [];

    for (const file of this.selectedFiles) {
      const reader = new FileReader();
      reader.onload = (e) => {
        //this.previewUrls.push(e.target?.result as string);
        this.array_assets.push(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    this.result = null;

    this.post.userId = localStorage.getItem('userId')?.toString() as string;

    if (this.post.body.trim() != ""
    ) {
      const formData = new FormData();
      this.selectedFiles.forEach((file, index) => {
        formData.append('photos', file); // ou `photos[]` si ton backend attend un tableau
      });
      formData.append('audio', this.post.audio)
      formData.append('userId', this.post.userId)
      formData.append('body', this.post.body)


      this.publicationsService.createNewPublication(formData).subscribe
        ({
          next: (data) => {
            if (data) {
              this.result = data.message 
              setTimeout(() => {
                document.location.href = '/mon-compte'
              }, 500)
            }
          }
          , error: (e) => {
            this.error = e.error;
            this.loading = false;
          }
        })
    }
    else {
      this.result = "❌ Veuillez ne pas laisser vide le text!"
    }
  }

  ngOnInit() {
    this.array_assets = []
    this.post.userId = localStorage.getItem('userId')?.toString() as string;
    this.audioList = this.audioService.getAudioList()
  }

  deleteImage(nb: number) {
    this.array_assets = this.array_assets.filter((item, i) => i !== nb)
  }


  get ArrayAsset() {
    return (this.array_assets) ? this.array_assets : null
  }

  isImage(url: string): boolean {
    return url.match(/^(data:image)|.*\.(jpeg|jpg|gif|png|webp|svg)$/i) !== null;
  }

  isVideo(url: string): boolean {
    return url.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i) !== null;
  }

}

