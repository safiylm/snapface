import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users-service'
import { User } from '../models/user.model'


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
 
export class UsersListComponent implements OnInit {
  title = 'json-read-example';
  constructor(private UsersService: UsersService) { }

  data!: User[];
  ngOnInit() {
    this.data = this.UsersService.getAllUsers();
  }
}
