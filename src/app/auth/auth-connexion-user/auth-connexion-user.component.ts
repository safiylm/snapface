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

  constructor(private userService: UserService) { }
  result = "";
  password = "Snapface123*";
  email = "travelblog@gmail.com"
  isDisplayPassword = false;


  toggleDisplayPassword() {
    this.isDisplayPassword = !this.isDisplayPassword;
  }


  onSubmit() {

    this.userService.connexion(this.email).subscribe(
      (data: any) => {
        console.log(data)

        if (data != null) {
          bcrypt.compare(this.password, data.user.password, (err, data1) => {
            //if error than throw error
          //  if (err) throw err

            //if both match than you can do anything
            if (data1) {
              localStorage.setItem('isLoggedIn', "true");
              localStorage.setItem('userId', data.user["_id"]);
              localStorage.setItem("user_photo_de_profil",data.user["photos_profil"])
              localStorage.setItem("user_name", data.user["firstName"] + " " + data.user["lastName"])

              this.result = "CONNEXION REUSSI.";
              window.location.href = '/mon-compte'

            } else {
              this.result = "Votre votre mot de passe est incorrecte.";
            }
          })
        }
        else
          this.result = "Votre email est incorrecte.";
      }
    );
  }
}
