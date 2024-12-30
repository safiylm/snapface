import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service'
import { User } from '../../models/user.model'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';


@Component({
  standalone:true, 
  selector: 'app-user-data-update',
  templateUrl: './user-data-update.component.html',
  styleUrls: ['./user-data-update.component.scss'], 
  imports:[ReactiveFormsModule, HeaderComponent, FormsModule],
})

export class UserDataUpdateComponent implements OnInit {

  constructor(private userService: UserService) { }

  user !: User;
  subscription !: Subscription;


  retrieveUser(): void {
    this.subscription = this.userService.getUser(localStorage.getItem("userId")?.toString() as string)
      .subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (e) => console.error(e)
      });
  }


  ngOnInit() {
    this.retrieveUser()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  onSubmit() {
    console.log(this.user!)
    this.userService.updateUser(this.user!);
  }
  
}
