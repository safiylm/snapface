import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user-service'
import { NgIf, NgStyle } from '@angular/common';
import { LoadingSpinnerResponseComponent } from 'src/app/loading-spinner-response/loading-spinner-response.component';

@Component({
  selector: 'app-password-oublier',
  templateUrl: './password-oublier.component.html',
  styleUrls: ['./password-oublier.component.scss'],
  standalone: true,
  imports: [FormsModule, LoadingSpinnerResponseComponent, NgStyle, NgIf]
})
export class PasswordOublierComponent {


  isDisplayPassword !: boolean;
  isDisplayPassword2 !: boolean;
  newpassword !: string;
  newpassword2 !: string;
  reglePasswordRespected !: boolean;
  is2PasswordIdentique !: boolean;

  result !: any;
  loading = false;
  error = '';
  constructor(private route: ActivatedRoute, private userService: UserService) { }


  toggleDisplayPassword(nb: number) {
    if (nb == 1)
      this.isDisplayPassword = !this.isDisplayPassword;
    if (nb == 2)
      this.isDisplayPassword2 = !this.isDisplayPassword2;

  }

  getFirstPassword() {
    // this.newpassword = event.target.value;

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

  getSecondPassword() {
    //this.newpassword2 = event.target.value;
    if (this.newpassword === this.newpassword2 && this.newpassword.trim() != "") {
      this.is2PasswordIdentique = true;
    } else {
      this.is2PasswordIdentique = false;
    }
  }


  ngOnInit() {
    if (this.route.snapshot.paramMap.get('token') == null || this.route.snapshot.paramMap.get('token') == undefined) {
      location.href = "/"
    }
    this.isDisplayPassword = false;
    this.isDisplayPassword2 = false;
    this.newpassword = "";
    this.newpassword2 = "";
    this.reglePasswordRespected = false;
    this.is2PasswordIdentique = false;
  }


  onSubmit() {
    this.loading = true;
    this.error = '';
    this.result = null;

    if (this.newpassword !== this.newpassword2) {
      this.result = "Les mots de passe ne sont pas identique!"
    } else {
      setTimeout(() => {

       this.userService.reinitialisePassword(this.route.snapshot.paramMap.get('token') as string, this.newpassword)
        .subscribe({
          next: data => {
            if (data) {
              this.loading = false
              this.result = "Votre mot de passe a été initialisée avec succès!"
            } else {
              this.error = "erreur"
              this.loading = false
            }
          }, error: e => this.error = e
        })
      }, 500)

    }
  }
}
