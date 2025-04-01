import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationsService } from '../../services/publication-service';
import { Publication } from 'src/models/publication.model';
import { FormsModule } from "@angular/forms";
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { HeaderSnapComponent } from '../header-snap/header-snap.component';

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
  array_image !: string[];
  newimage = "";

  constructor(private publicationService: PublicationsService, private route: ActivatedRoute) { }

  getDataPost(): void {
    this.subscription = this.publicationService.getPublicationById(this.id)
      .subscribe({
        next: (data) => {
          this.post = data;
          this.array_image = data.images
        },
        error: (e) => console.error(e)
      });
  }


  deleteImage(nb: number) {
    this.array_image = this.array_image.filter((item, i) => i !== nb) as [string]
  }


  addNewImage() {
    if (this.newimage != null)
      this.array_image.push(this.newimage);
    this.newimage = "";
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getDataPost();
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
    this.post.images = this.array_image as [string]
    console.log(this.post)
    this.publicationService.editPost(this.post!).subscribe(
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

}

