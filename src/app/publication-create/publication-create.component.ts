import { Component, Input, OnInit } from '@angular/core';
import { Publication } from '../../models/publication.model';
import { FormsModule } from "@angular/forms";
import { PublicationsService } from '../../services/publication-service';
import { CommonModule, NgFor } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  standalone: true,
  selector: 'app-publication-create',
  templateUrl: './publication-create.component.html',
  styleUrls: ['./publication-create.component.scss'],
  imports: [FormsModule, NgFor, HeaderComponent, CommonModule]
})


export class PublicationCreateComponent implements OnInit {

  post = new Publication("", "", "", [''], 0, "");
  array_image !: string[];
  newimage !: string;
  result = ""

  constructor(private publicationsService: PublicationsService) { }

  ngOnInit() {
    this.array_image = []
  }

  addNewImage() {
    if (this.newimage != null) {
      this.array_image.push(this.newimage);
    }
    this.newimage = "";
  }

  deleteImage(nb: number) {
    this.array_image = this.array_image.filter((item, i) => i !== nb)
  }

  onSubmit() {
    this.post.userId = localStorage.getItem('userId')?.toString() as string;
    this.post.images = this.array_image as [string];

    this.publicationsService.createNewPublication(this.post).subscribe(
      (data) => {
        if (data != null) { this.result = "Votre publication a été crée avec succès!" }
        else { this.result = "Une erreur s'est introduite, veuillez réessayer!" }
      }

    )

  }

  get ArrayImage() {
    return (this.array_image) ? this.array_image : null
  }

}

