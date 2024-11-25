import { Component } from '@angular/core';
import { User } from '../../models/user.model'
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'], 
  imports:[NgFor]
})

export class UsersListComponent {
  
  users?: User[];
  
  constructor(private roote: ActivatedRoute) {
    this.users = this.roote.snapshot.data['users']
  }

}
