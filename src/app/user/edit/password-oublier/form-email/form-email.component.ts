import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/services/user-service';
import { HeaderComponent } from "../../../../header/header.component";
import { LoadingSpinnerResponseComponent } from 'src/app/loading-spinner-response/loading-spinner-response.component';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-form-email',
  templateUrl: './form-email.component.html',
  styleUrls: ['./form-email.component.scss'],
  imports: [FormsModule, LoadingSpinnerResponseComponent, NgIf, HeaderComponent]
})

export class FormEmailComponent {

  constructor(private userService: UserService) { }

  email = "";
  result !: any;
  loading = false;
  error = '';


  onSubmit() {
    this.loading = true;
    this.error = '';
    this.result = null;

    this.userService.getIfEmailExist(this.email).subscribe({
      next: (data) => {
        if (data != null || data != undefined) {
          this.result = "Votre email existe!"
          this.userService.getMailForChangePasswordOublie(this.email).subscribe({
            next: (data1) => {
              if (data1) {
                this.loading = false
                this.result = "Veuillez controler votre boîte mail pour réinitialiser votre mot de passe."
              }
            },
            error: e => {
              this.loading = false
              console.error(e)
            }
          })


        } else {
          this.error = "Votre email n'existe pas!"
        }
      },
      error: e => console.error(e)

    })

  }
}
