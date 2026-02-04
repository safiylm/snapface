import { Component, Injectable } from '@angular/core';
import { UserService } from '../../../services/user-service'
import { FormsModule } from "@angular/forms";
import { CommonModule, NgIf } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { LoadingSpinnerResponseComponent } from 'src/app/loading-spinner-response/loading-spinner-response.component';

@Component({
  standalone: true,
  selector: 'app-auth-connexion-user',
  templateUrl: './auth-connexion-user.component.html',
  styleUrls: ['./auth-connexion-user.component.scss'],
  imports: [FormsModule, HeaderComponent, CommonModule, LoadingSpinnerResponseComponent, NgIf],

})

@Injectable({ providedIn: 'root' })

export class AuthConnexionUserComponent {

  constructor(private userService: UserService,) { }
  result !: any;
  loading = false;
  error = '';

  password = "Snapface123*";
  email = "motivation@gmail.com"
  isDisplayPassword = false;


  toggleDisplayPassword() {
    this.isDisplayPassword = !this.isDisplayPassword;
  }


  onSubmit() {
    this.loading = true;
    this.error = '';
    this.result = null;

    setTimeout(() => {
      this.userService.connexion(this.email, this.password).subscribe({
        next: (data: any) => {
          if (data.message) {
            this.loading = false;
            this.result = data.message

            let userconnected = {
              "isLoggedIn": "true", 'userId': data.user["_id"],
              "user_photo_de_profil": data.user["photos_profil"],
              "user_name": data.user.name
            }
            localStorage.setItem('userconnected', JSON.stringify(userconnected));

             setTimeout(() => {
               location.href = "/"
             }, 500)
          }
        },
        error: (err) => {
          this.error = err.error;
          this.loading = false;
        },
      }
      )
    }, 500)
  }
}
