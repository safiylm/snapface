import { Component, OnInit } from '@angular/core';
import { Publication } from '../../../../models/publication.model';
import { ActivatedRoute } from '@angular/router';
import { PublicationComponent } from '../../../post/publication/publication.component';
import { NgFor } from '@angular/common';
import { PublicationsService } from 'src/services/publication-service';

@Component({
  standalone: true,
  selector: 'app-publication-all-list',
  templateUrl: './publication-all-list.component.html',
  styleUrls: ['./publication-all-list.component.scss'],
  imports: [PublicationComponent, NgFor]
})
export class PublicationAllListComponent implements OnInit {

  publications: Publication[] = [];
  currentPage = 1;

  constructor(private route: ActivatedRoute, private publicationService: PublicationsService) { }

  ngOnInit() {
    this.publications = this.route.snapshot.data['publications'];
  }


  loadMore() {
    this.currentPage++;
    this.publicationService.getAllPublications_(this.currentPage, 5).subscribe(data => {
      this.publications = [...this.publications, ...data]; // append
    });
  }

}