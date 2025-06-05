import { Component, Injectable } from '@angular/core';
import { UserService } from '../../../services/user-service'
import { FormsModule } from "@angular/forms";
import * as bcrypt from "bcryptjs";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';

@Component({
  standalone: true,
  selector: 'app-auth-connexion-user',
  templateUrl: './auth-connexion-user.component.html',
  styleUrls: ['./auth-connexion-user.component.scss'],
  imports: [FormsModule, HeaderComponent, CommonModule],

})

@Injectable({ providedIn: 'root' })

export class AuthConnexionUserComponent {

  constructor(private userService: UserService,) { }
  result = "";
  password = "Snapface123*";
  email = "travelblog@gmail.com"
  isDisplayPassword = false;


  toggleDisplayPassword() {
    this.isDisplayPassword = !this.isDisplayPassword;
  }


  onSubmit() {
    this.userService.connexion(this.email, this.password).subscribe(
      (data: any) => {

        if (data.user != null) {

          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('userId', data.user["_id"]);
          localStorage.setItem("user_photo_de_profil", data.user["photos_profil"])
          localStorage.setItem("user_name", data.user["firstName"] + " " + data.user["lastName"])

          this.result = "CONNEXION REUSSI.";
          window.location.href = '/mon-compte'
        }

        if (data.message != null)
          this.result = data.message

      }
    );

  }
}
