import { Component, NgModule, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service'
import { User } from '../../models/user.model'
import * as bcrypt from "bcryptjs";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';


@Component({
  standalone: true,
  selector: 'app-auth-inscription-user',
  templateUrl: './auth-inscription-user.component.html',
  styleUrls: ['./auth-inscription-user.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],

})


export class AuthInscriptionUserComponent implements OnInit {
  constructor(private userService: UserService) { }



  isDisplayPassword !: boolean;
  isDisplayPassword2 !: boolean;
  timeForRedirection$?: any;
  firstPassword !: string;
  secondPassword !: string;
  is2PasswordIdentique !: boolean;
  displayToasts = false;
  reglePasswordRespected !: boolean;

  inscriptionUserForm = new FormGroup({
    lastName: new FormControl("", [Validators.required]),
    firstName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')]),
    password2: new FormControl("", [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')]),
    phoneNo: new FormControl("", [Validators.required]),
    photos_background: new FormControl("", [Validators.required]),
    photos_profil: new FormControl("", [Validators.required])
  });
  user = new User("", "aYHAN", "YILMAZ", "AYHAN@GMAIL.COM", "AyHAN123*", 0, "ZDFGVB", "DESFCVB");


  ngOnInit() {
    this.isDisplayPassword = false;
    this.isDisplayPassword2 = false;
    this.firstPassword = "";
    this.secondPassword = "";
    this.reglePasswordRespected = false;
    this.is2PasswordIdentique = false;
  }

  toggleDisplayPassword() {
    this.isDisplayPassword = !this.isDisplayPassword;
  }


  toggleDisplayPassword2() {
    this.isDisplayPassword2 = !this.isDisplayPassword2;
  }


  getFirstPassword(event: any) {
    this.firstPassword = event.target.value;

    if (this.firstPassword.length > 8 &&
      this.firstPassword.match('[a-z]+') != null &&
      this.firstPassword.match('[A-Z]+') != null &&
      this.firstPassword.match('[0-9]+') != null &&
      this.firstPassword.match('[!@#$%^&*]+') != null

    ) {
      this.reglePasswordRespected = true;
    } else {
      this.reglePasswordRespected = false;
    }
  }

  getSecondPassword(event: any) {
    this.secondPassword = event.target.value;
    if (this.firstPassword === this.secondPassword) {
      this.is2PasswordIdentique = true;
    } else {
      this.is2PasswordIdentique = false;
    }
  }


  onSubmit() {

    if (this.inscriptionUserForm.valid) {

      this.user.lastName = this.inscriptionUserForm.value['lastName']?.toString() as string;
      this.user.firstName = this.inscriptionUserForm.value['firstName']?.toString() as string;
      this.user.email = this.inscriptionUserForm.value['email']?.toString() as string;
      this.user.password = this.inscriptionUserForm.value['password']?.toString() as string;
      this.user.phoneNo = Number(this.inscriptionUserForm.value['phoneNo']?.toString());
      this.user.photos_background = this.inscriptionUserForm.value['photos_background']?.toString() as string;
      this.user.photos_profil = this.inscriptionUserForm.value['photos_profil']?.toString() as string;

      const salt = bcrypt.genSaltSync(10);
      this.user.password = bcrypt.hashSync(this.inscriptionUserForm.value['password']?.toString() as string, salt);
      console.log(this.user)
      this.userService.inscription(this.user)

      //  this.displayToasts = true;

      // this.timeForRedirection$ = interval(1000).pipe(
      //   scan(acc => --acc, 10),
      //   takeWhile(x => x >= 0)
      // );

      // setTimeout(() => {
      //   document.location.href = '/connexion'
      // }, 10000)

    }
  }

}

//https://jasonwatmore.com/post/2019/11/21/angular-http-post-request-examples