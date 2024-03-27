import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user-service'
import { User } from '../../models/user.model'
import { FormGroup, FormControl } from "@angular/forms";
import { AuthGuard } from '../guards/auth.guard';

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

    this.userService.connexion(this.email, this.password);

    setTimeout(() => {

      let retrievedUsername = localStorage.getItem('userdata');
     let res = JSON.parse(retrievedUsername as string)
      console.log(res);
    
      //supprimer local storage variale 
      //  localStorage.setItem('userdata', "");  
        localStorage.setItem('userId', res._id );  
        console.log("localStorage.getItem('userId')");
        console.log(localStorage.getItem('userId'));


      if (res.resultat != "error connexion") {
        //(document.getElementById("connexion-info") as HTMLFormElement).innerText = "Connexion successfull";
        window.location.href = '/mon-compte'
      } else {
        (document.getElementById("connexion-info") as HTMLFormElement).innerHTML = "Connexion error";
      }


    }, 1000)


  }




}
