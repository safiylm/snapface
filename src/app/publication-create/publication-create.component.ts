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

  post = new Publication("", "", "", [''], 0,  localStorage.getItem('userId')?.toString() as string);
  array_assets !: string[];
  newasset !: string;
  result = ""
   ;

  constructor(private publicationsService: PublicationsService) { }

  ngOnInit() {
    this.array_assets = []
    this.post.userId = localStorage.getItem('userId')?.toString() as string;
  }

  ngAfterViewInit(){
    this.post.userId = localStorage.getItem('userId')?.toString() as string;

  }

  addNewImage() {
    if (this.newasset != null) {
      this.array_assets.push(this.newasset);
    }
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

}

