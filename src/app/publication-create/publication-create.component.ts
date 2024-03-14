import { Component, OnInit } from '@angular/core';
import { Publication } from '../../models/publication.model';
import { FormGroup, FormControl } from "@angular/forms";
import { PublicationsService } from '../../services/publication-service';

@Component({
  selector: 'app-publication-create',
  templateUrl: './publication-create.component.html',
  styleUrls: ['./publication-create.component.scss']
})
export class PublicationCreateComponent implements OnInit {

  userId = "65cd023efb273094193ac038";
  post = new Publication( "", "","",[''], 0,this.userId,);
  
  postCreateForm = new FormGroup({
    title: new FormControl(""),
    body: new FormControl(""),
    image: new FormControl(""),
    video: new FormControl(""),
    audio: new FormControl(""),
   
  });
  constructor(private publicationsService: PublicationsService) { }

  addnewImages(){


  }
  
  onSubmit() {

    this.post.title= this.postCreateForm.value['title']?.toString() as string;
    this.post.body= this.postCreateForm.value['body']?.toString() as string;
    this.post.images[0]= this.postCreateForm.value['image']?.toString() as string;
   
   
    console.log(this.post);

    this.publicationsService.createNewPublication(this.post);

  }

  ngOnInit() { }

}

