import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users-service'
import { User } from '../models/user.model'
import { FormGroup, FormControl } from "@angular/forms";
import { user_array } from '../json-database/users-array';

@Component({
  selector: 'app-auth-inscription-user',
  templateUrl: './auth-inscription-user.component.html',
  styleUrls: ['./auth-inscription-user.component.scss']
})


export class AuthInscriptionUserComponent implements OnInit {
  constructor(private UsersService: UsersService) { }

  inscriptionUserForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    password2: new FormControl(""),
    photos_background: new FormControl(""),
    photos_profil: new FormControl("")
  });


  public syncWriteFile(): void {
    var f = new File([""], "filename.txt", {type: "text/plain" })
   
    // writeFileSync( '../json-database/users-arrayy' ,
    //   "" + this.UsersService.getAllUsers
    //   , {
    //     flag: 'w',
    //   });
    // const contents = readFileSync(  '../json-database/users-arrayy', 'utf-8');
    // console.log(contents);
  }


   
    ngOnInit() { }


  onSubmit() {
    console.log(this.inscriptionUserForm.value['name']);

    this.UsersService.pushNewUser(
      new User(4,
        this.inscriptionUserForm.value['photos_profil']!,
        this.inscriptionUserForm.value['photos_background']!,
        this.inscriptionUserForm.value['name']!,
        this.inscriptionUserForm.value['email']!,
        "female"
      ));

    this.syncWriteFile();
  }




}
