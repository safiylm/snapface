import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service'
import { User } from '../../../models/user.model'
import * as bcrypt from "bcryptjs";
import { FormsModule } from "@angular/forms";
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { interval, scan, takeWhile } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-auth-inscription-user',
  templateUrl: './auth-inscription-user.component.html',
  styleUrls: ['./auth-inscription-user.component.scss'],
  imports: [CommonModule, FormsModule, HeaderComponent],

})


export class AuthInscriptionUserComponent implements OnInit {
  constructor(private userService: UserService) { }

  res !: string;
  isDisplayPassword !: boolean;
  isDisplayPassword2 !: boolean;
  timeForRedirection$?: any;
  reglePasswordRespected !: boolean;

  user = new User("", "", "",
    "example@gmail.com", "Snapface123*",
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
    if (this.user && this.reglePasswordRespected && this.user.password === this.password2) {
      const salt = bcrypt.genSaltSync(10);
      this.user.password = bcrypt.hashSync(this.user.password, salt);
      this.userService.inscription(this.user).subscribe(
        {
          next: (data) => {
            if (data.user) {
              this.res = "Inscription success. Il faut confirmer votre email. Redirection dans {{ timeForRedirection$ | async }} secondes pour vous connectez."
              /* 
              
              ce code genere erreur dans le teste 
              
              
               this.timeForRedirection$ = interval(1000).pipe(
                   scan(acc => --acc, 10),
                   takeWhile(x => x >= 0)
                 );
   
                 setTimeout(() => {
                   document.location.href = '/connexion'
                 }, 10000)
   */
            }
            if (data.message)
              this.res = data.message
          },
          error: (e) => console.error("Erreur inscription")

        })
    }
  }


}

//https://jasonwatmore.com/post/2019/11/21/angular-http-post-request-examples