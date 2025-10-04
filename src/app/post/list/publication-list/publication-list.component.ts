import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { Publication } from '../../../../models/publication.model';
import { ActivatedRoute, ɵEmptyOutletComponent } from '@angular/router';
import { PublicationComponent } from '../../publication/publication.component';
import { NgIf, NgFor } from '@angular/common';
import { UsersListComponent } from "../../../user/users-list/users-list.component";
import { User } from 'src/models/user.model';

@Component({
  standalone: true,
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss'],
  imports: [PublicationComponent, NgFor, NgIf, UsersListComponent]

})

export class PublicationListComponent {


  @Input() publications!: Publication[];
  user !: User;
  post: Publication | undefined;
  @Input() isDisplay !: boolean;
  menuBtnClick: boolean = false;
  isMobile !: boolean;

  index = 0

  constructor(route: ActivatedRoute, private renderer: Renderer2) {
    this.publications = route.snapshot.data['publications']
    this.user = route.snapshot.data['user'];
  }

  ngOnInit() {
    if (window.innerWidth <= 1050) { // Si on est sur mobile
      this.isMobile = true; // Si on veut afficher les commentaires, on cache le post
    } else {
      this.isMobile = false; // Sur PC/tablette, le post reste affiché
    }
  }

  ngAfterViewInit() {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.menuBtnClick) {
        this.post = undefined;
        this.menuOpen = false;

      }
      this.menuBtnClick = false;
    });
  }

  clickImage(i: number){
    this.isMobile=true; this.index= i; 
  }

  voirPost(post: Publication) {
    this.post = post;
  }


  hidePost() {
    this.post = undefined;
  }
  preventCloseOnClick() {
    this.menuBtnClick = true;
  }

  menuOpen: boolean = false;


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


}