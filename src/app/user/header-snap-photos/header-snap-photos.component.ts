import { NgIf,  } from '@angular/common';
import { Component, Input, Renderer2 } from '@angular/core';
import { User } from 'src/models/user.model';
import { EditPhotosComponent } from '../edit/user-data-update/edit-photos/edit-photos.component';
import { FormsModule } from '@angular/forms';

@Component({
  standalone:true,
  selector: 'app-header-snap-photos',
  templateUrl: './header-snap-photos.component.html',
  styleUrls: ['./header-snap-photos.component.scss'],
   imports: [ NgIf,
      FormsModule, EditPhotosComponent
    ],
})
export class HeaderSnapPhotosComponent {

  @Input() user !: User;
  @Input() isMe !: boolean;
  isDisplayPhotoViewerProfil !: boolean;
  isDisplayPhotoViewerBackground !: boolean;
  showEditPhotoProfil = false
  showEditPhotoBackground = false
  menuBtnClick: boolean = false;
  menuOpen: boolean = false;

  ngOnInit() {
    // this.displayUser();
    this.isDisplayPhotoViewerProfil = false;
    this.isDisplayPhotoViewerBackground = false;
  }

  constructor(private renderer: Renderer2) {
  }

  preventCloseOnClick() {
    this.menuBtnClick = true;
  }



  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  ngAfterViewInit() {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.menuBtnClick) {
        this.menuOpen = false;
        this.hidePhotoViewerProfil();
        this.hidePhotoViewerBackground();
      }
      this.menuBtnClick = false;
    });
  }

  hidePhotoViewerProfil() {
    this.isDisplayPhotoViewerProfil = false;
  }

  hidePhotoViewerBackground() {
    this.isDisplayPhotoViewerBackground = false;
  }

  showPhotoViewerProfil() {
    this.isDisplayPhotoViewerProfil = true;
  }

  showPhotoViewerBackground() {
    this.isDisplayPhotoViewerBackground = true;
  }


  get UserPhotoProfil() {
    return (this.user && this.user.photos_profil) ? this.user.photos_profil : null
  }

  get UserPhotoBackground() {
    return (this.user && this.user.photos_background) ? this.user.photos_background : null
  }

  get UserName() {
    return (this.user && this.user.name) ? this.user.name : null
  }

}
