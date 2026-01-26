import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/services/user-service';
import { LoadingSpinnerResponseComponent } from 'src/app/loading-spinner-response/loading-spinner-response.component';

@Component({
  standalone: true,
  selector: 'app-edit-phonenumber',
  templateUrl: './edit-phonenumber.component.html',
  styleUrls: ['./edit-phonenumber.component.scss'],
  imports: [CommonModule, LoadingSpinnerResponseComponent, 
    FormsModule]
})
export class EditPhonenumberComponent {

  @Input() phoneNumber !: number;
  result !: any;
  loading = false;
  error = '';


  constructor(private userService: UserService) { }

  editPhoneNumber() {

    this.loading = true;
    this.error = '';
    this.result = null;

    if (this.phoneNumber != null)

      setTimeout(() => {

        this.userService.editPhoneNumber(JSON.parse(localStorage.getItem('userconnected') as string).userId
          , this.phoneNumber).subscribe({
            next: (data) => {
              if (data) {
                this.loading = false
                this.result = "Envoie d'un email de verification en cours";
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


