import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationsService } from '../../services/publication-service';
import { Publication } from 'src/models/publication.model';
import { FormsModule } from "@angular/forms";
import { Subscription } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-publication-edit',
  templateUrl: './publication-edit.component.html',
  styleUrls: ['./publication-edit.component.scss'],
  imports:[ NgFor, FormsModule]
})
export class PublicationEditComponent {

  id: string = "";
  post!: Publication;
  subscription !: Subscription;

  constructor(private publicationService: PublicationsService, private route: ActivatedRoute) { }

  getDataPost(): void {
    this.subscription = this.publicationService.getPublicationById(this.id)
      .subscribe({
        next: (data) => {
          this.post = data;
        },
        error: (e) => console.error(e)
      });
  }


  deleteImage(nb: number) {
    this.post!.images = this.post?.images.filter((item, i) => i !== nb) as [string]
  }


  addNewImage(e : string ) {
    this.post?.images.push(e);
  }


  deletePost() {
    if (confirm("Êtes-vous sur de vouloir supprimer la publication?")) {
      this.publicationService.deletePost(this.id)
    }
  }


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getDataPost();
  }


  onSubmit() {
    this.publicationService.editPost(this.post!);
    setTimeout(() => {
      document.location.href = "/mon-compte"
    }, 2000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

