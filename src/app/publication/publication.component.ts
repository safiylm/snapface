import { Component, OnInit, Input } from '@angular/core';
import { Publication } from '../../models/publication.model';
import { PublicationsService } from '../../services/publication-service'

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})

export class PublicationComponent implements OnInit {

  @Input() publication!: Publication;

  constructor(private publicationService: PublicationsService) { }

  index: number = 0;
  buttonText!: string;
  isMyPost: boolean = false ;


  ngOnInit() {
    this.buttonText = 'Oh Snap!';
    if(this.publication.userId == localStorage.getItem('userId')){
      this.isMyPost = true;
    }
  }
  goToEditPost(){
    document.location.href='publication/edit/'+this.publication._id 
  }


  onSnap() {
    if (this.buttonText === 'Oh Snap!') {
      this.publicationService.snapPublicationById(this.publication._id, 'snap');
      this.buttonText = 'Oops, unSnap!';
    } else {
      this.publicationService.snapPublicationById(this.publication._id, 'unsnap');
      this.buttonText = 'Oh Snap!';
    }
  }

  displayImageNext() {
    if (this.index < this.publication.images.length -1 ){
      this.index += 1;}
  }

  displayImagePrecedent() {
    if (this.index > 0)
      this.index -= 1;
  }

  get Title(){
    return (this.publication && this.publication.title )? this.publication.title : null
  }

  get Body(){
    return (this.publication && this.publication.body )? this.publication.body : null
  }

  get Publicationn(){
    return (this.publication  )? this.publication : null

  }
}
