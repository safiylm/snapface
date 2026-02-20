import { Component, Input } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { UserService } from '../../../../services/user-service'
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { LoadingSpinnerResponseComponent } from 'src/app/loading-spinner-response/loading-spinner-response.component';

@Component({
  standalone: true,
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.scss'],
  imports: [FormsModule, NgStyle, NgClass,
    LoadingSpinnerResponseComponent, NgIf]
})


export class PasswordEditComponent {

  id: string = JSON.parse(localStorage.getItem('userconnected') as string).userId

  result !: any;
  loading = false;
  error = '';

  @Input() email !: string;

  isDisplayPassword = false;

  oldPasswordChecked = false

  passwordActuel = "";
  newpassword = "";
  newpassword2 = "";

  reglePasswordRespected = false;
  is2PasswordIdentique = false;

  constructor(private userService: UserService) { }


  getFirstPassword(event: any) {
    this.newpassword = event.target.value;
    this.reglePasswordRespected = false;

    if (this.newpassword.length > 8 &&
      this.newpassword.match('[a-z]+') != null &&
      this.newpassword.match('[A-Z]+') != null &&
      this.newpassword.match('[0-9]+') != null &&
      this.newpassword.match('[!@#$%^&*]+') != null
    ) {
      this.reglePasswordRespected = true;
    }
  }

  getSecondPassword(event: any) {
    this.newpassword2 = event.target.value;
    this.is2PasswordIdentique = false;

    if (this.newpassword === this.newpassword2) {
      this.is2PasswordIdentique = true;
    }
  }

  checkOldPassword() {
    if (this.email != "" && this.email != null && this.email != undefined &&
      this.passwordActuel != "" && this.passwordActuel != null && this.passwordActuel != undefined)
      setTimeout(() => {
        this.userService.connexion(this.email, this.passwordActuel).subscribe({
          next: (data: any) => {
            if (data.message) {
              console.log(data)
              this.oldPasswordChecked = true
            }
          },
          error: (err) => {
            this.oldPasswordChecked = true
          },
        }
        )
      }, 500)
  }

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.result = null;

    if (this.newpassword !== this.newpassword2) {
      this.result = "Les mots de passe ne sont pas identique!"
    } else {

      setTimeout(() => {
        if (this.newpassword != null)
          this.userService.editPassword(this.id, this.newpassword)
            .subscribe({
              next: (data) => {
                if (data) {
                  this.result = "Votre mot de passe a été modifié avec succès!"
                  this.loading = false
                }
              },
              error: (er) => {
                this.loading = false
                this.error = er.message_
                console.error(er)
              }
            })
      }, 500)


    }

  }
}