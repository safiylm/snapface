import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service'
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model'
import { FormGroup, FormControl } from "@angular/forms";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-data-update',
  templateUrl: './user-data-update.component.html',
  styleUrls: ['./user-data-update.component.scss']
})
export class UserDataUpdateComponent implements OnInit {

  @Input() userId !: any;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  user?: User;
  user2 = new User(this.userId, "", "", "", "", 0, "", "");
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
    this.subscription = this.userService.getUser(this.userId)
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
    if (this.updateUserForm.controls['email'].value != "") {
      this.user2.email = this.updateUserForm.controls['email'].value as string
    }
    if (this.updateUserForm.controls['password'].value != "") {
      this.user2.password = this.updateUserForm.controls['password'].value as string
    }
    if (this.updateUserForm.controls['photos_background'].value != "") {
      this.user2.photos_background = this.updateUserForm.controls['photos_background'].value as string
    }
    if (this.updateUserForm.controls['photos_profil'].value != "") {
      this.user2.photos_profil = this.updateUserForm.controls['photos_profil'].value as string
    }
    if (this.updateUserForm.controls['phoneNo'].value != "") {
      this.user2.phoneNo = Number(this.updateUserForm.controls['phoneNo'].value);
    }

    this.userService.updateUser(this.user2)

  }
  
}
