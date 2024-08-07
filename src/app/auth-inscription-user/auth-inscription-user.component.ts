import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service'
import { User } from '../../models/user.model'
import { FormGroup, FormControl } from "@angular/forms";
import { interval, scan, takeWhile } from 'rxjs';

@Component({
  selector: 'app-auth-inscription-user',
  templateUrl: './auth-inscription-user.component.html',
  styleUrls: ['./auth-inscription-user.component.scss']
})


export class AuthInscriptionUserComponent implements OnInit {
  constructor(private userService: UserService) { }

  timeForRedirection$?: any;

  displayToasts = false;


  inscriptionUserForm = new FormGroup({
    lastName: new FormControl(""),
    firstName: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    password2: new FormControl(""),
    phoneNo: new FormControl(""),
    photos_background: new FormControl(""),
    photos_profil: new FormControl("")
  });
  user = new User("", "", "", "", "",0, "", "");


  ngOnInit() { }

  onSubmit() {
    if (this.inscriptionUserForm.valid) {
      this.user.lastName = this.inscriptionUserForm.value['lastName']?.toString() as string;
      this.user.firstName = this.inscriptionUserForm.value['firstName']?.toString() as string;
      this.user.email = this.inscriptionUserForm.value['email']?.toString() as string;
      this.user.password = this.inscriptionUserForm.value['password']?.toString() as string;
      this.user.phoneNo = Number(this.inscriptionUserForm.value['phoneNo']?.toString());
      this.user.photos_background = this.inscriptionUserForm.value['photos_background']?.toString() as string;
      this.user.photos_profil = this.inscriptionUserForm.value['photos_profil']?.toString() as string;

      this.userService.pushNewUser(this.user);

      this.displayToasts = true;

      this.timeForRedirection$ = interval(1000).pipe(
        scan(acc => --acc, 10),
        takeWhile(x => x >= 0)
      );
      
      setTimeout(() => {
        document.location.href = '/connexion'
      }, 10000)

    }
  }




}

//https://jasonwatmore.com/post/2019/11/21/angular-http-post-request-examples