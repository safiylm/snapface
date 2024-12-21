import { Component, ElementRef, Injectable, OnInit, Pipe, ViewChild } from '@angular/core';
import { UserService } from '../../services/user-service'
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import * as bcrypt from "bcryptjs";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  standalone: true,
  selector: 'app-auth-connexion-user',
  templateUrl: './auth-connexion-user.component.html',
  styleUrls: ['./auth-connexion-user.component.scss'],
  imports: [ ReactiveFormsModule, HeaderComponent, CommonModule ],
})

@Injectable({ providedIn: 'root' })

export class AuthConnexionUserComponent implements OnInit {

  constructor(private userService: UserService, private elemRef: ElementRef ) { }

  password !: string;
  email !: string;
  isDisplayPassword !: boolean;
  resultatconnexion !: string;
  @ViewChild("connexionInfo") connexionInfo !: ElementRef;

  connexionUserForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });

  toggleDisplayPassword() {
    this.isDisplayPassword = !this.isDisplayPassword;
  }

  ngOnInit() {
    this.isDisplayPassword = false;
   // this.connexionInfo.nativeElement.innerText = "";
  }


  ngAfterViewInit() {
    // Après l'initialisation de la vue, nous pouvons accéder en toute
    // sécurité à notre élément référencé.
   // this.connexionInfo.nativeElement.innerText = "";
  }

  onSubmit() {
    this.email = this.connexionUserForm.value['email']?.toString() as string;
    this.password = this.connexionUserForm.value['password']?.toString() as string;

    this.userService.connexion(this.email).subscribe(
      (data: any) => {

        this.resultatconnexion = data;
        setTimeout(() => {

          if (this.resultatconnexion != null) {

            bcrypt.compare(this.password, data.password, (err, data1) => {
              //if error than throw error
              if (err) throw err

              //if both match than you can do anything
              if (data1) {
                localStorage.setItem('isLoggedIn', "true");
                localStorage.setItem('userId', data["_id"]);
                window.location.href = '/mon-compte'
              } else {
              //  this.connexionInfo.nativeElement.innerText = "Votre votre mot de passe est incorrecte.";
              }
            })
          }
         // else
          //  this.connexionInfo.nativeElement.innerText = "Votre email est incorrecte.";

        }, 2000)

      }
    );
  }
}
