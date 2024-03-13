import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationsService } from '../../services/publication-service';
import { Publication } from 'src/models/publication.model';
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-publication-edit',
  templateUrl: './publication-edit.component.html',
  styleUrls: ['./publication-edit.component.scss']
})
export class PublicationEditComponent {

  id : string = "65cd023efb273094193ac038";
  data?: Publication ;
  post = new Publication( "", "","",[""], 0, "", ["", "" ], ["", "" ]);

  constructor(private publicationService: PublicationsService, private route: ActivatedRoute) { }


  postEditForm = new FormGroup({
    title: new FormControl(""),
    body: new FormControl(""),
    image: new FormControl(""),
    video: new FormControl(""),
    audio: new FormControl(""),
   
  });

  getDataPost(): void {
    this.publicationService.getPublicationById( this.id) 
      .subscribe({
        next: (data) => {
          this.data = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  ngOnInit() {
    
    this.id = this.route.snapshot.paramMap.get('id')! ;
    this.getDataPost();

    
  }

  onSubmit(){
    this.post._id = this.id;
    this.post.title= this.postEditForm.value['title']?.toString() as string;
    if( this.post.title==undefined){
      this.post.title=this.data?.title.toString() as string;
    }

    this.post.body= this.postEditForm.value['body']?.toString() as string;
    if( this.post.body==undefined){
      this.post.body=this.data?.body.toString() as string;
    }

    this.post.images[0]= this.postEditForm.value['image']?.toString() as string;
    if( this.post.images[0]==undefined){
      this.post.images[0]=this.data?.images.toString() as string;
    }

    this.post.videos[0]= this.postEditForm.value['video']?.toString() as string;
    if( this.post.videos[0]==undefined){
      this.post.videos[0]=this.data?.videos.toString() as string;
    }

    this.post.audios[0]= this.postEditForm.value['audio']?.toString() as string;
    if( this.post.audios[0]==undefined){
      this.post.audios[0]=this.data?.audios.toString() as string;
    }
    console.log(this.post);
    this.publicationService.editPost(this.post);
  }

}

