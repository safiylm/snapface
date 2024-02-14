import { Component, OnInit, Input } from '@angular/core';
import { user_array } from '../json-database/users-array';
import { UserService } from '../services/user-service'
import { User } from '../models/user.model'

@Component({
  selector: 'app-header-snap',
  templateUrl: './header-snap.component.html',
  styleUrls: ['./header-snap.component.scss']
})


export class HeaderSnapComponent implements OnInit {
 
  //Passing Data into this Component
  @Input() id !: string ;
 
  user !: User;

  constructor(private UserService: UserService) { }


  retrieveUser(): void {
    this.UserService.getUser( this.id) 
      .subscribe({
        next: (data) => {
          this.user = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  ngOnInit(): void {
    this.retrieveUser()
  }
  
}


