import { NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { Component, Input, Renderer2 } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { User } from 'src/models/user.model';
import { EditPhotosComponent } from '../edit/user-data-update/edit-photos/edit-photos.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone:true,
  selector: 'app-header-snap-photos',
  templateUrl: './header-snap-photos.component.html',
  styleUrls: ['./header-snap-photos.component.scss'],
   imports: [ NgIf, TitleCasePipe,
      FormsModule, EditPhotosComponent, NgClass
    , MatButtonModule, MatMenuModule,],
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
    return (this.user && this.user.firstName && this.user.lastName) ? this.user.firstName + " " + this.user.lastName : null
  }

}
