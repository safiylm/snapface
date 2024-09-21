import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  array_image !: string[];
  newimage !: string;
  postCreateForm = new FormGroup({
    title: new FormControl(""),
    body: new FormControl(""),
    image: new FormControl(""),
  });

  @ViewChild("image") connexionInfo !: ElementRef;

  
  constructor(private publicationsService: PublicationsService) { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.array_image=[]
    this.connexionInfo.nativeElement.innerText = "";

  }

  addNewImage(){
    this.array_image.push( this.postCreateForm.value['image']?.toString() as string);
    this.newimage= "";
    this.connexionInfo.nativeElement.innerHTML = 
    this.connexionInfo.nativeElement.innerHTML + " <img width='200px' height='auto' src=' " + 
    this.array_image[ this.array_image.length-1] +"' alt='Nouvelle image n°"+ this.array_image.length +"'/>"
  }
  
  onSubmit() {
    this.post.title= this.postCreateForm.value['title']?.toString() as string;
    this.post.body= this.postCreateForm.value['body']?.toString() as string;
    this.post.images= this.array_image as [string]; 
    this.post.userId = this.userId;
    console.log(this.post);


    this.publicationsService.createNewPublication(this.post);
    setTimeout(() => {
      document.location.href= "/mon-compte"
    }, 2000);
    
  }



}

