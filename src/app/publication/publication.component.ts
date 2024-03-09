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
  // ...

  ngOnInit() {
    this.buttonText = 'Oh Snap!';
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
}
// ...
