import { Component, ElementRef, Injectable, OnInit, Pipe, ViewChild } from '@angular/core';
import { UserService } from '../../services/user-service'
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";
import * as bcrypt from "bcryptjs";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  standalone: true,
  selector: 'app-auth-connexion-user',
  templateUrl: './auth-connexion-user.component.html',
  styleUrls: ['./auth-connexion-user.component.scss'],
  imports: [FormsModule, HeaderComponent, CommonModule],
})

@Injectable({ providedIn: 'root' })

export class AuthConnexionUserComponent {

  constructor(private userService: UserService, private elemRef: ElementRef) { }
  result = "";
  password = "";
  email = "";
  isDisplayPassword = false;



  toggleDisplayPassword() {
    this.isDisplayPassword = !this.isDisplayPassword;
  }


  onSubmit() {

    this.userService.connexion(this.email).subscribe(
      (data: any) => {

        if (data != null) {

          bcrypt.compare(this.password, data.password, (err, data1) => {
            //if error than throw error
            if (err) throw err

            //if both match than you can do anything
            if (data1) {
              localStorage.setItem('isLoggedIn', "true");
              localStorage.setItem('userId', data["_id"]);
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
