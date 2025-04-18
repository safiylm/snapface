import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service'
import { User } from '../../models/user.model'
import { FormsModule } from "@angular/forms";
import { Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { EditEmailComponent } from '../edit-email/edit-email.component';
import { EditPhonenumberComponent } from '../edit-phonenumber/edit-phonenumber.component';
import { HeaderSnapComponent } from "../header-snap/header-snap.component";
import { EditPhotosComponent } from './edit-photos/edit-photos.component';
import { PasswordEditComponent } from "../password-edit/password-edit.component";

@Component({
  standalone: true,
  selector: 'app-user-data-update',
  templateUrl: './user-data-update.component.html',
  styleUrls: ['./user-data-update.component.scss'],
  imports: [CommonModule, HeaderComponent, FormsModule,
    EditEmailComponent, EditPhonenumberComponent,
     HeaderSnapComponent, PasswordEditComponent],
})

export class UserDataUpdateComponent implements OnInit {

  constructor(private userService: UserService) { }

  user !: User;
  subscription !: Subscription;
  resultatOfEdit = "";
  isSubmit = false;
  id = localStorage.getItem("userId")?.toString() as string;
  isVisibleEditEmail= false;
  isVisibleEditPassword =false;
  isVisibleEditNbPhone =false;
  retrieveUser(): void {
    this.subscription = this.userService.getUser( this.id )
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
    this.isSubmit = true;
    this.userService.updateUser(this.user!).subscribe({
      next: data => {
        if (data) {
          this.resultatOfEdit = " Vos données ont été modifié avec succès.";
         setTimeout(() => {
             document.location.href = '/mon-compte'
           }, 1000)
        }
        else
        this.resultatOfEdit="Erreur, vos données n'ont pas été modifié."
      },
      error: e =>{ this.resultatOfEdit = "Erreur, vos données n'ont pas été modifié."
        ; 
        console.error(e)}
    })
  }

}
