import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service'
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-auth-connexion-user',
  templateUrl: './auth-connexion-user.component.html',
  styleUrls: ['./auth-connexion-user.component.scss']
})

export class AuthConnexionUserComponent implements OnInit {

  constructor(private userService: UserService) { }

  password !: string;
  email !: string;

  connexionUserForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });


  ngOnInit() { }


  onSubmit() {
    this.email = this.connexionUserForm.value['email']?.toString() as string;
    this.password = this.connexionUserForm.value['password']?.toString() as string;
    let res = this.userService.connexion(this.email, this.password)

    res.subscribe((data: any) => {
      console.log(data)
      if (data != null) {
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('userId', data._id);
        window.location.href = '/mon-compte'
      } else {
        (document.getElementById("connexion-info") as HTMLFormElement).innerHTML = "Votre email et/ou votre mot de passe est incorrecte.";
      }
    }
    )
  }
}
