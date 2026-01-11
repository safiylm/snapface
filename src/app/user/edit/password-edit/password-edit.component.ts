import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { UserService } from '../../../../services/user-service'
import { NgIf, NgStyle } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.scss'],
  imports: [FormsModule, NgStyle, NgIf]
})


export class PasswordEditComponent {

  id: string = JSON.parse(localStorage.getItem('userconnected')as string ).userId


  isDisplayPassword0 = false;
  isDisplayPassword = false;
  isDisplayPassword2 = false;
  passwordActuel = "";
  passwordActuel0 = "";
  newpassword = "";
  newpassword2 = "";
  reglePasswordRespected = false;
  is2PasswordIdentique = false;
  resultat = ""

  constructor( private userService: UserService) { }


  toggleDisplayPassword(nb: number) {
    if (nb == 0)
      this.isDisplayPassword0 = ! this.isDisplayPassword0
    if (nb == 1)
      this.isDisplayPassword = !this.isDisplayPassword;
    if (nb == 2)
      this.isDisplayPassword2 = !this.isDisplayPassword2;

  }

  getFirstPassword(event: any) {
    this.newpassword = event.target.value;

    if (this.newpassword.length > 8 &&
      this.newpassword.match('[a-z]+') != null &&
      this.newpassword.match('[A-Z]+') != null &&
      this.newpassword.match('[0-9]+') != null &&
      this.newpassword.match('[!@#$%^&*]+') != null

    ) {
      this.reglePasswordRespected = true;
    } else {
      this.reglePasswordRespected = false;
    }
  }

  getSecondPassword(event: any) {
    this.newpassword2 = event.target.value;
    if (this.newpassword === this.newpassword2) {
      this.is2PasswordIdentique = true;
    } else {
      this.is2PasswordIdentique = false;
    }
  }

  getPassword(){
    this.userService.getUser(localStorage.getItem("userId")?.toString() as string).subscribe({
      next: (data) => {
        if (data)
          this.passwordActuel0 = data.password
      }
    })
  }

  ngOnInit() {
    this.getPassword()
  }

  onSubmit() {

    if (this.newpassword === this.newpassword2) {

          this.userService.editPassword(this.id,this.newpassword)
            .subscribe(data => {
              if (data) {
                this.resultat = "Votre mot de passe a été modifié avec succès!"
                this.getPassword()
                setTimeout(()=>{ 
                  document.location.href = '/mon-compte'
                }, 1500)
              } else {
                this.resultat = "Erreur veuillez réessayer!"
              }
            })
       // } else {
          this.resultat = "Ancien mot de passe n'est pas bon!"
    }
    else {
      this.resultat = "Les mots de passe ne sont pas identique!"
    }
  }
}