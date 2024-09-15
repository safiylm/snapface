import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service'
import { User } from '../../models/user.model'
import {Subscription} from "rxjs";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit {
  title = 'json-read-example';
  subscription !: Subscription;
  constructor(private UserService: UserService) { }
  data?: User[];


  retrieveUsers(): void {
   this.subscription = this.UserService.getAllUsers()
      .subscribe({
        next: (data) => {
          this.data = data;
        },
        error: (e) => console.error(e)
      });
  }


  ngOnInit() {
   this.retrieveUsers()
  }

  ngOnDestroy(){
    // dabonner du flux et ainsi améliore les performances de mon application.
    this.subscription.unsubscribe();
  }
}
