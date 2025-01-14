import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/services/user-service';
import { HeaderComponent } from "../../header/header.component";

@Component({
  standalone: true,
  selector: 'app-form-email',
  templateUrl: './form-email.component.html',
  styleUrls: ['./form-email.component.scss'],
  imports: [FormsModule, HeaderComponent]
})

export class FormEmailComponent {

  constructor(private userService: UserService) { }

  email = "";
  resultat = ""

  onSubmit() {

    this.userService.getIfEmailExist(this.email).subscribe({
      next: (data) => {
        if (data != null || data != undefined) {
            this.resultat = "Votre email existe!"
          this.userService.getMailForChangePasswordOublie(this.email).subscribe({
            next: (data1) => {
              if (data1 != null || data1 != undefined)this.resultat = "Veuillez controler votre boîte mail pour réinitialiser votre mot de passe."
            },
            error: e => console.error(e)
          })

        
        } else {
          this.resultat = "Votre email n'existe pas!"
        }
      },
      error: e => console.error(e)

    })

  }
}
