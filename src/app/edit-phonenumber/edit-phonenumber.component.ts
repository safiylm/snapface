import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

 @Input() phoneNumber !: number;
  resultat = "";

  ngOnInit(){
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


