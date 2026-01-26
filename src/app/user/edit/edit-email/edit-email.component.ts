import { Component, Input } from '@angular/core';
import { UserService } from 'src/services/user-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerResponseComponent } from 'src/app/loading-spinner-response/loading-spinner-response.component';

@Component({
  standalone: true,
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.scss'],
  imports: [CommonModule, LoadingSpinnerResponseComponent, FormsModule]

})
export class EditEmailComponent {
  @Input() email !: string ;

  result !: any;
  loading = false;
  error = '';

  constructor(private userService: UserService) { }

  editEmail() {
    this.loading = true;
    this.error = '';
    this.result = null;

    if (this.email.trim() != "")

      setTimeout(() => {

        this.userService.editEmail(JSON.parse(localStorage.getItem('userconnected') as string).userId
          , this.email).subscribe({
            next: (data: any) => {
              if (data) {
                this.loading = false
                this.result = data.message;
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
