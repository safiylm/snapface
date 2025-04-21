import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-avatar-user',
  templateUrl: './avatar-user.component.html',
  styleUrls: ['./avatar-user.component.scss'],
  imports: [NgIf]
})
export class AvatarUserComponent {
  user_photo_de_profil: string | undefined;
  user_name: string | undefined;
  get PhotoProfil() {
    this.user_photo_de_profil = localStorage.getItem("user_photo_de_profil")!.toString() as string
    // return 
    return (this.user_photo_de_profil) ? this.user_photo_de_profil : null
  }

  get UserName() {
    this.user_name = localStorage.getItem("user_name")!.toString() as string
    return (this.user_name ) ? this.user_name : null
  }
}
