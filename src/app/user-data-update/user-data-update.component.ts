import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service'
import { User } from '../../models/user.model'
import { FormGroup, FormControl, ReactiveFormsModule } from "@angular/forms";
import { Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';


@Component({
  standalone:true, 
  selector: 'app-user-data-update',
  templateUrl: './user-data-update.component.html',
  styleUrls: ['./user-data-update.component.scss'], 
  imports:[ReactiveFormsModule, HeaderComponent]
})

export class UserDataUpdateComponent implements OnInit {

  userId = localStorage.getItem("userId")?.toString() as string;

  constructor(private userService: UserService) { }

  user?: User;
  user2 = new User(localStorage.getItem("userId")?.toString() as string, "", "", "", "", 0, "", "");
  subscription !: Subscription;

  updateUserForm = new FormGroup({
    lastName: new FormControl(""),
    firstName: new FormControl(),
    email: new FormControl(""),
    password: new FormControl(""),
    phoneNo: new FormControl(""),
    photos_background: new FormControl(""),
    photos_profil: new FormControl("")
  });


  retrieveUser(): void {
    this.subscription = this.userService.getUser(localStorage.getItem("userId")?.toString() as string)
      .subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (e) => console.error(e)
      });
  }


  ngOnInit() {
    this.retrieveUser()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  onSubmit() {
    this.user2._id = localStorage.getItem("userId") as string;
    this.user2.lastName = this.user?.lastName.toString() as string;
    this.user2.firstName = this.user?.firstName.toString() as string;
    this.user2.email = this.user?.email.toString() as string;
    this.user2.password = this.user?.password.toString() as string;
    this.user2.photos_background = this.user?.photos_background.toString() as string;
    this.user2.phoneNo = Number(this.user?.phoneNo.toString());
    this.user2.photos_profil = this.user?.photos_profil.toString() as string;

    if (this.updateUserForm.controls['lastName'].value != "") {
      this.user2.lastName = this.updateUserForm.controls['lastName'].value as string
    }
    if (this.updateUserForm.controls['firstName'].value != "") {
      this.user2.firstName = this.updateUserForm.controls['firstName'].value as string
    }
    if (this.updateUserForm.controls['photos_background'].value != "") {
      this.user2.photos_background = this.updateUserForm.controls['photos_background'].value as string
    }
    if (this.updateUserForm.controls['photos_profil'].value != "") {
      this.user2.photos_profil = this.updateUserForm.controls['photos_profil'].value as string
    }
    this.userService.updateUser(this.user2);

  }
  
}
