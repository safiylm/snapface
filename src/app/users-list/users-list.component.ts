import { Component } from '@angular/core';
import { User } from '../../models/user.model'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent {
  
  users?: User[];
  
  constructor(private roote: ActivatedRoute) {
    this.users = this.roote.snapshot.data['users']
  }

}
