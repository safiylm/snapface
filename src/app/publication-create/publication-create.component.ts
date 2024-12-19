import { Component, Input, OnInit } from '@angular/core';
import { Publication } from '../../models/publication.model';
import { FormGroup, FormControl, ReactiveFormsModule } from "@angular/forms";
import { PublicationsService } from '../../services/publication-service';
import { NgFor } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  standalone: true,
  selector: 'app-publication-create',
  templateUrl: './publication-create.component.html',
  styleUrls: ['./publication-create.component.scss'], 
  imports:[ReactiveFormsModule, NgFor, HeaderComponent]
})


export class PublicationCreateComponent implements OnInit {
  @Input() userId !:string ;
  post = new Publication("", "", "", [''], 0, this.userId as string,);
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
    if( this.postCreateForm.value['image']?.toString() as string != null )
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
    this.post.userId = this.userId as string;

    this.publicationsService.createNewPublication(this.post);
    setTimeout(() => {
      document.location.href = "/mon-compte"
    }, 2000);

  }

  get ArrayImage(){
    return (this.array_image  )? this.array_image : null
  }

}

