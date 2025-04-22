import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from 'src/models/user.model';

@Component({
  standalone: true,
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'], 
  imports:[NgIf]
})
export class UserComponent {
 @Input() user !: User;

 get PhotoProfil(){
  return (this.user  && this.user.photos_profil )? this.user.photos_profil : null
}

get UserName(){
  return (this.user && this.user.firstName && this.user.lastName )? this.user.firstName+" "+ this.user.lastName : null
}
}
