import { Component, Input, OnInit } from '@angular/core';
import { Publication } from '../../models/publication.model';
import { FormGroup, FormControl } from "@angular/forms";
import { PublicationsService } from '../../services/publication-service';

@Component({
  selector: 'app-publication-create',
  templateUrl: './publication-create.component.html',
  styleUrls: ['./publication-create.component.scss']
})


export class PublicationCreateComponent implements OnInit {
  @Input() userId !: string;
  post = new Publication("", "", "", [''], 0, this.userId,);
  array_image !: string[];
  newimage !: string;
  postCreateForm = new FormGroup({
    title: new FormControl(""),
    body: new FormControl(""),
    image: new FormControl(""),
  });

  constructor(private publicationsService: PublicationsService) { }

  ngOnInit() {
    this.array_image = []
  }

  addNewImage() {
    this.array_image.push(this.postCreateForm.value['image']?.toString() as string);
    this.newimage = "";
  }

  deleteImage(nb: number) {
    this.array_image = this.array_image.filter((item, i) => i !== nb)
  }

  onSubmit() {
    this.post.title = this.postCreateForm.value['title']?.toString() as string;
    this.post.body = this.postCreateForm.value['body']?.toString() as string;
    this.post.images = this.array_image as [string];
    this.post.userId = this.userId;

    this.publicationsService.createNewPublication(this.post);
    setTimeout(() => {
      document.location.href = "/mon-compte"
    }, 2000);

  }

  get ArrayImage(){
    return (this.array_image  )? this.array_image : null
  }

}

