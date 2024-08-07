import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationsService } from '../../services/publication-service';
import { Publication } from 'src/models/publication.model';
import { FormGroup, FormControl } from "@angular/forms";
import { first } from 'rxjs';

@Component({
  selector: 'app-publication-edit',
  templateUrl: './publication-edit.component.html',
  styleUrls: ['./publication-edit.component.scss']
})
export class PublicationEditComponent {

  id: string = "65cd023efb273094193ac038";
  data?: Publication;
  post = new Publication("", "", "", [""], 0, "",);

  constructor(private publicationService: PublicationsService, private route: ActivatedRoute) { }

  postEditForm = new FormGroup({
    title: new FormControl(""),
    body: new FormControl(""),
    image: new FormControl("")
  });

  getDataPost(): void {
    this.publicationService.getPublicationById(this.id)
      .subscribe({
        next: (data) => {
          this.data = data;
        },
        error: (e) => console.error(e)
      });
  }

  deletePost() {
    if (confirm("Êtes-vous sur de vouloir supprimer la publication?")) {
      this.publicationService.deletePost(this.id)
    }
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getDataPost();

    this.publicationService.getPublicationById(this.id)
      .pipe(first())
      .subscribe(x => this.postEditForm.patchValue(x));
  }

  onSubmit() {
    this.post._id = this.id;
    this.post.title = this.data?.title.toString() as string;
    this.post.body = this.data?.body.toString() as string;
    this.post.userId = localStorage.getItem("userId") as string;
    this.post.images[0] = this.data?.images[0].toString() as string;

    if (this.postEditForm.controls['title'].valueChanges.subscribe.length != 0)
      this.post.title = this.postEditForm.controls['title'].value as string

    if (this.postEditForm.controls['body'].valueChanges.subscribe.length != 0)
      this.post.body = this.postEditForm.controls['body'].value as string

    if (this.postEditForm.controls['image'].value != "")
      this.post.images[0] = this.postEditForm.controls['image'].value as string

    this.publicationService.editPost(this.post);
  }

}

