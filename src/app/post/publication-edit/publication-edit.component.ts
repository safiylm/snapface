import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationsService } from '../../../services/publication-service';
import { Publication } from 'src/models/publication.model';
import { FormsModule } from "@angular/forms";
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { HeaderSnapComponent } from '../../user/header-snap/header-snap.component';


@Component({
  standalone: true,
  selector: 'app-publication-edit',
  templateUrl: './publication-edit.component.html',
  styleUrls: ['./publication-edit.component.scss'],
  imports: [NgFor, FormsModule, NgIf, HeaderSnapComponent]
})


export class PublicationEditComponent {

  id: string = this.route.snapshot.paramMap.get('id')!; //postId
  post!: Publication;
  subscription !: Subscription;
  resultatOfEdit = "";
  array_assets !: string[];
  selectedFiles: File[] = [];


  constructor(private publicationService: PublicationsService,
    private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getDataPost();
  }

  onFilesSelected(event: Event): void {

    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.selectedFiles = Array.from(input.files);

    for (const file of this.selectedFiles) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.array_assets.push(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  }


  getDataPost(): void {
    this.subscription = this.publicationService.getPublicationById(this.id)
      .subscribe({
        next: (data) => {
          this.post = data;
          this.array_assets = data.assets
        },
        error: (e) => console.error(e)
      });
  }


  deleteImage(nb: number) {
    this.array_assets = this.array_assets.filter((item, i) => i !== nb) as [string]
  }


  deletePost() {
    if (confirm("Êtes-vous sur de vouloir supprimer la publication?")) {
      this.publicationService.deletePost(this.id).subscribe(
        data => {
          if (data) {
            this.resultatOfEdit = "Votre publication a été supprimé avec succès.";
            setTimeout(() => {
              document.location.href = '/mon-compte'
            }, 1000)
          }
          else
            this.resultatOfEdit = "Erreur, Votre publication n'a pas été supprimé."
        })
    }
  }

  onSubmit() {
    this.post.userId = localStorage.getItem('userId')?.toString() as string;

    const formData = new FormData();
    this.selectedFiles.forEach((file, index) => {
      formData.append('photos', file); // ou `photos[]` si ton backend attend un tableau
    });
    formData.append('_id', this.post._id)
    formData.append('title', this.post.title)
    formData.append('audio', this.post.audio)
    formData.append('userId', this.post.userId)
    formData.append('body', this.post.body)
   

    this.publicationService.editPost(formData).subscribe(
      data => {
        console.log(data)
        if (data) {
          this.resultatOfEdit = " Votre publication a été modifié avec succès.";
          setTimeout(() => {
            document.location.href = '/mon-compte'
          }, 3000)
        }
        else
          this.resultatOfEdit = "Erreur, Votre publication n'a pas été modifié."
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  isImage(url: string): boolean {
    return url.match(/^(data:image)|.*\.(jpeg|jpg|gif|png|webp|svg)$/i) !== null;
  }

  isVideo(url: string): boolean {
    return url.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i) !== null;
  }
}

