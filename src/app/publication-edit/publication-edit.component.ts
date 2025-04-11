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
  array_assets !: string[];
  newasset = "";

  constructor(private publicationService: PublicationsService, private route: ActivatedRoute) { }

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


  addNewAsset() {
    if (this.newasset != null)
      this.array_assets.push(this.newasset);
    this.newasset = "";
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
    this.post.assets = this.array_assets as [string]
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

