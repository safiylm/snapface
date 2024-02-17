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
  constructor(private UserService: UserService) { }

  inscriptionUserForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    password2: new FormControl(""),
    photos_background: new FormControl(""),
    photos_profil: new FormControl("")
  });


  ngOnInit() { }


  onSubmit() {
    console.log(this.inscriptionUserForm.value['name']);

    this.UserService.pushNewUser(
      new User(4,
        this.inscriptionUserForm.value['photos_profil']!,
        this.inscriptionUserForm.value['photos_background']!,
        this.inscriptionUserForm.value['name']!,
        this.inscriptionUserForm.value['email']!,
        "female", ""
      ));

  }

}
