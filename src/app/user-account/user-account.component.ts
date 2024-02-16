import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service'
import { User } from '../models/user.model'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent  implements OnInit {
  title = 'json-read-example';
  id : string = "65cd023efb273094193ac038";

  constructor(private UserService: UserService) { }
  data?: User[];


  retrieveUsers(): void {
    this.UserService.getAllUsers()
      .subscribe({
        next: (data) => {
          this.data = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  ngOnInit() {
   this.retrieveUsers()
  }

}
