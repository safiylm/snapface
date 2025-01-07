import { Component } from '@angular/core';
import { UserService } from 'src/services/user-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone : true,
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.scss'],
    imports:[CommonModule, FormsModule ]
  
})
export class EditEmailComponent {
  email= "";
  resultat= "";

  constructor(private userService: UserService){}

  ngOnInit(){
    this.userService.getUser(localStorage.getItem("userId")?.toString() as string)
    .subscribe({
      next: (data) => {
        this.email = data.email;
      },
      error: (e) => console.error(e)
    });
  }

  editEmail(){
    this.userService.editEmail(localStorage.getItem('userId')?.toString() as string, this.email).subscribe({
      next: (data)=>{
        if(data)
          this.resultat="Email modifier avec succes";
        else
        this.resultat ="Erreur, réessayser";
      },
      error: (e)=>
      this.resultat ="Erreur, réessayser"+e
    })
  }
}
