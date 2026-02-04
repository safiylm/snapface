import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service'
import { User } from '../../../models/user.model'
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { LoadingSpinnerResponseComponent } from 'src/app/loading-spinner-response/loading-spinner-response.component';


@Component({
  standalone: true,
  selector: 'app-auth-inscription-user',
  templateUrl: './auth-inscription-user.component.html',
  styleUrls: ['./auth-inscription-user.component.scss'],
  imports: [CommonModule, FormsModule,
    LoadingSpinnerResponseComponent, HeaderComponent],

})


export class AuthInscriptionUserComponent implements OnInit {
  constructor(private userService: UserService) { }

  isDisplayPassword !: boolean;
  isDisplayPassword2 !: boolean;
  timeForRedirection$?: any;
  reglePasswordRespected !: boolean;
  result !: any;
  loading = false;
  error = '';
  user = new User("", "",
    "", "",
    0, "", "", false, false, null);

  password2 = "";

  ngOnInit() {
    this.isDisplayPassword = false;
    this.isDisplayPassword2 = false;
    this.reglePasswordRespected = false;
  }

  toggleDisplayPassword(num: number) {
    if (num == 1)
      this.isDisplayPassword = !this.isDisplayPassword;
    if (num == 2)
      this.isDisplayPassword2 = !this.isDisplayPassword2;

  }

  getFirstPassword(event: any) {

    if (this.user.password.length > 8 &&
      this.user.password.match('[a-z]+') != null &&
      this.user.password.match('[A-Z]+') != null &&
      this.user.password.match('[0-9]+') != null &&
      this.user.password.match('[!@#$%^&*]+') != null

    ) {
      this.reglePasswordRespected = true;
    } else {
      this.reglePasswordRespected = false;
    }
  }

  onSubmit(): void {

    this.loading = true;
    this.error = '';
    this.result = null;

    if (this.user.name != "" &&
      this.user.email != "" &&
      this.user.password != "" &&
      this.user.phoneNo != 0
    )

      if (this.user && this.reglePasswordRespected && this.user.password === this.password2) {

        setTimeout(() => {

          this.userService.inscription(this.user).subscribe(
            {
              next: (data) => {
                if (data.message) {
                  this.loading = false;
                  this.result = data.message
                  let userconnected = {
                    "isLoggedIn": "true", 'userId': data.userId,
                    "user_photo_de_profil": '', "user_name": this.user.name
                  }

                  localStorage.setItem('userconnected', userconnected.toString());
                 
                  setTimeout(() => {
                    location.href = "/"
                  }, 500)
                }
              },
              error: (e) => {
                this.error = e.error;
                this.loading = false;
              }

            })
        }, 500)

      }
  }


}

//https://jasonwatmore.com/post/2019/11/21/angular-http-post-request-examples