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
    this.user_photo_de_profil =JSON.parse(localStorage.getItem('userconnected')?.toString() as string).user_photo_de_profil
    // return 
    return (this.user_photo_de_profil) ? this.user_photo_de_profil : null
  }

  get UserName() {
    this.user_name = JSON.parse(localStorage.getItem('userconnected')?.toString() as string).user_name
    return (this.user_name ) ? this.user_name : null
  }
}
