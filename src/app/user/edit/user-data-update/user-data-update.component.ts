import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user-service'
import { User } from '../../../../models/user.model'
import { FormsModule } from "@angular/forms";
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EditEmailComponent } from '../../edit/edit-email/edit-email.component';
import { EditPhonenumberComponent } from '../../edit/edit-phonenumber/edit-phonenumber.component';
import { PasswordEditComponent } from "../../edit/password-edit/password-edit.component";
import { HeaderSnapPhotosComponent } from '../../header-snap-photos/header-snap-photos.component';
import { LoadingSpinnerResponseComponent } from 'src/app/loading-spinner-response/loading-spinner-response.component';

@Component({
  standalone: true,
  selector: 'app-user-data-update',
  templateUrl: './user-data-update.component.html',
  styleUrls: ['./user-data-update.component.scss'],
  imports: [CommonModule, FormsModule, HeaderSnapPhotosComponent,
    EditEmailComponent, LoadingSpinnerResponseComponent, EditPhonenumberComponent, PasswordEditComponent],
})

export class UserDataUpdateComponent implements OnInit {

  constructor(private userService: UserService) { }

  result !: any;
  loading = false;
  error = '';

  user !: User;
  subscription !: Subscription;


  retrieveUser(): void {
    this.subscription = this.userService.getUser(
      JSON.parse(localStorage.getItem('userconnected') as string).userId
    )
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
    this.loading = true;
    this.error = '';
    this.result = null;

    setTimeout(() => {

    this.userService.updateUser(this.user!).subscribe({
      next: data => {
        if (data) {
            this.loading = false;
            this.result =  " Vos modifications ont été enregistrées avec succès.";
          setTimeout(() => {
            document.location.href = '/mon-compte'
          }, 1000)
        }
     },
      error: e => {
        this.error = e.message_ 
        console.error(e)
         this.loading = false;
      }
    })
    }, 500)

  }

  del() {
    if (confirm("Voulez vous vraiment supprimer votre compte?"))
      this.userService.deleteUser("")
  }

}
