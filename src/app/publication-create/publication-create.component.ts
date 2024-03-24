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
  @Input() userId !: string ;
  
  post = new Publication( "", "","",[''], 0, this.userId,);
  array_image = [0,1];
  postCreateForm = new FormGroup({
    title: new FormControl(""),
    body: new FormControl(""),
    image: new FormControl(""),
    //video: new FormControl(""),
    //audio: new FormControl(""),
   
  });
  constructor(private publicationsService: PublicationsService) { }

  // addnewImages(){
  //   this.array_image.push( this.array_image.length)
  //   console.log(this.array_image)
  // }
  
  onSubmit() {
    this.post.title= this.postCreateForm.value['title']?.toString() as string;
    this.post.body= this.postCreateForm.value['body']?.toString() as string;
    this.post.images[0]= this.postCreateForm.value['image']?.toString() as string;
    this.post.userId = this.userId;
    this.publicationsService.createNewPublication(this.post);
    setTimeout(() => {
      document.location.href= "/mon-compte"
    }, 2000);
  }

  ngOnInit() {
 
   }

}

