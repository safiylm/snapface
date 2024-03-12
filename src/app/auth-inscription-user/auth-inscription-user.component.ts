import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service'
import { User } from '../../models/user.model'
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-auth-inscription-user',
  templateUrl: './auth-inscription-user.component.html',
  styleUrls: ['./auth-inscription-user.component.scss']
})


export class AuthInscriptionUserComponent implements OnInit {
  constructor(private userService: UserService) { }

  inscriptionUserForm = new FormGroup({
    lastName: new FormControl(""),
    firstName: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    password2: new FormControl(""),
    phoneNo : new FormControl(""),
    photos_background: new FormControl(""),
    photos_profil: new FormControl("")
  });
  user = new User( "", "","","","", "", "",  0);
  

  ngOnInit() { }


  
  onSubmit() {

    this.user.lastName= this.inscriptionUserForm.value['lastName']?.toString() as string;
    this.user.firstName= this.inscriptionUserForm.value['firstName']?.toString() as string;
    this.user.email= this.inscriptionUserForm.value['email']?.toString() as string;
    this.user.password= this.inscriptionUserForm.value['password']?.toString() as string;
    this.user.phoneNo= Number(this.inscriptionUserForm.value['phoneNo']?.toString() );
    this.user.photos_background= this.inscriptionUserForm.value['photos_background']?.toString() as string;
    this.user.photos_profil= this.inscriptionUserForm.value['photos_profil']?.toString() as string;


    console.log(this.user);
    this.userService.pushNewUser(this.user)

    //window.location.href = '/'
  }




}

//https://jasonwatmore.com/post/2019/11/21/angular-http-post-request-examples