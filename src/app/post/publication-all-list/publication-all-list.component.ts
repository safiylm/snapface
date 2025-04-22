import { Component, OnInit } from '@angular/core';
import { Publication } from '../../../models/publication.model';
import { ActivatedRoute } from '@angular/router';
import { PublicationComponent } from '../../post/publication/publication.component';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-publication-all-list',
  templateUrl: './publication-all-list.component.html',
  styleUrls: ['./publication-all-list.component.scss'],
  imports:[ PublicationComponent, NgFor]
})
export class PublicationAllListComponent implements OnInit {

  publications!: Publication[];

  constructor( private route: ActivatedRoute) {
    this.publications = this.route.snapshot.data['publications'];
  }

  ngOnInit() {}
}