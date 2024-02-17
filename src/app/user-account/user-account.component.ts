import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service'
import { User } from '../../models/user.model'
import { HttpClient } from '@angular/common/http';


import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent  implements OnInit {
  title = 'json-read-example';
  id : string = "65cd023efb273094193ac038";


  constructor(private UserService: UserService, private route: ActivatedRoute) { }

  data?: User;


  retrieveUsers(): void {
   // this.data = this.UserService.getUser();
      
  }

  ngOnInit() {
    
      this.id = this.route.snapshot.paramMap.get('id')! ;

  
   this.retrieveUsers()
  }

}
