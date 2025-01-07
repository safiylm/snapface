import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/services/user-service';

@Component({
  standalone : true,
  selector: 'app-edit-phonenumber',
  templateUrl: './edit-phonenumber.component.html',
  styleUrls: ['./edit-phonenumber.component.scss'],
  imports:[CommonModule, FormsModule ]
})
export class EditPhonenumberComponent {

  phoneNumber = 0;
  resultat = "";

  ngOnInit(){
    this.userService.getUser(localStorage.getItem("userId")?.toString() as string)
    .subscribe({
      next: (data) => {
        this.phoneNumber = data.phoneNo;
      },
      error: (e) => console.error(e)
    });
  }
  constructor(private userService: UserService) { }

  editPhoneNumber() {
    this.userService.editPhoneNumber( localStorage.getItem('userId')?.toString() as string, this.phoneNumber).subscribe({
      next: (data) => {
        if (data)
          this.resultat = "Numero de telephone modifié avec succes";
        else
          this.resultat = "Erreur, réessayser";
      },
      error: (e) =>
        this.resultat = "Erreur, réessayser" + e
    })
  }
}


