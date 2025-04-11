import { Component, Input, OnInit } from '@angular/core';
import { Publication } from '../../models/publication.model';
import { FormsModule } from "@angular/forms";
import { PublicationsService } from '../../services/publication-service';
import { CommonModule, NgFor } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { HeaderSnapComponent } from '../header-snap/header-snap.component';

@Component({
  standalone: true,
  selector: 'app-publication-create',
  templateUrl: './publication-create.component.html',
  styleUrls: ['./publication-create.component.scss'],
  imports: [FormsModule, NgFor, HeaderComponent, HeaderSnapComponent, CommonModule]
})


export class PublicationCreateComponent implements OnInit {

  post = new Publication("", "", "", [''], 0,  localStorage.getItem('userId')?.toString() as string, "");
  array_assets !: string[];
  newasset !: string;
  result = ""
  isVisibleAddAssets = false;


  constructor(private publicationsService: PublicationsService) { }

  ngOnInit() {
    this.array_assets = []
    this.post.userId = localStorage.getItem('userId')?.toString() as string;
  }

  ngAfterViewInit(){
    this.post.userId = localStorage.getItem('userId')?.toString() as string;

  }

  addNewAsset() {
    if (this.newasset != null) {
      this.array_assets.push(this.newasset);
    }
    this.isVisibleAddAssets = false; 
    this.newasset = "";
  }

  deleteImage(nb: number) {
    this.array_assets = this.array_assets.filter((item, i) => i !== nb)
  }

  onSubmit() {
    this.post.userId = localStorage.getItem('userId')?.toString() as string;
    this.post.assets = this.array_assets as [string];
    this.post.date = Date.now()

    this.publicationsService.createNewPublication(this.post).subscribe({
      next: (data) => {
        console.log(data)
        if (data) {
          this.result = "Votre publication a été crée avec succès!"
          setTimeout(() => {
            document.location.href = '/mon-compte'
          }, 1500)
        }
        else { this.result = "Une erreur s'est introduite, veuillez réessayer!" }
      }

    })

  }

  get ArrayAsset() {
    return (this.array_assets) ? this.array_assets : null
  }

  
  toggleAddAssets(){
    this.isVisibleAddAssets= ! this.isVisibleAddAssets
  }

  isImage(url: string): boolean {
    return url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) !== null;
  }

  isVideo(url: string): boolean {
    return url.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i) !== null;
  }
}

