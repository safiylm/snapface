import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user-service'
import { User } from '../../models/user.model'
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-auth-connexion-user',
  templateUrl: './auth-connexion-user.component.html',
  styleUrls: ['./auth-connexion-user.component.scss']
})

export class AuthConnexionUserComponent implements OnInit {

  constructor(private userService: UserService) { }

  connexionUserForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
  });


  password !: string;
  email !: string;

  ngOnInit() { }


  onSubmit() {
    this.email = this.connexionUserForm.value['email']?.toString() as string;
    this.password = this.connexionUserForm.value['password']?.toString() as string;

    this.userService.connexion(this.email, this.password)
    // window.location.href = '/'
  }

}
