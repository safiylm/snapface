import { Component, OnInit } from '@angular/core';
import {user_array} from '../json-database/users-array';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  title = 'json-read-example';
  data = user_array ;

  ngOnInit() {
    console.log('Data', this.data);
  }
}
