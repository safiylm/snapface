import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service'
import { User } from '../../models/user.model'
import { FormsModule } from "@angular/forms";
import { Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-user-data-update',
  templateUrl: './user-data-update.component.html',
  styleUrls: ['./user-data-update.component.scss'],
  imports: [CommonModule, HeaderComponent, FormsModule],
})

export class UserDataUpdateComponent implements OnInit {

  constructor(private userService: UserService) { }

  user !: User;
  subscription !: Subscription;
  resultatOfEdit = "";
  isSubmit = false;

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
    this.isSubmit = true;
    this.userService.updateUser(this.user!).subscribe({
      next: data => {
        if (data) {
          this.resultatOfEdit = " Vos données ont été modifié avec succès.";
          // setTimeout(() => {
          //   document.location.href = '/mon-compte'
          // }, 3000)
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
