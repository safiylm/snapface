import { Component, OnInit } from '@angular/core';
import * as  users from '../json-database/users.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent  implements OnInit {
  title = 'json-read-example';
  data: any = users;

  ngOnInit() {
    console.log('Data', this.data);
  }
}
