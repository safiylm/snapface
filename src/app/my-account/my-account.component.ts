import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service'
import { User } from '../../models/user.model'
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  title = 'json-read-example';
  id: string = localStorage.getItem('userId')?.toString() as string;

  isDisplayPosts: boolean = true;
  isDisplayCreateNewPost: boolean = false;
  isDisplayUserEditForm: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  data?: User;

  ngOnInit() {
    this.id = localStorage.getItem('userId')?.toString() as string;

  }

  displayPosts() {
    this.isDisplayPosts = true;
    this.isDisplayCreateNewPost = false;
    this.isDisplayUserEditForm = false;
  }

  displayCreateNewPost() {
    this.isDisplayPosts = false;
    this.isDisplayCreateNewPost = true;
    this.isDisplayUserEditForm = false;
  }

  displayUserEditForm() {
    this.isDisplayPosts = false;
    this.isDisplayCreateNewPost = false;
    this.isDisplayUserEditForm = true;
  }


  logout(){
    console.log('logout');  
    this.userService.logout();  
   document.location.href="/"
  }
}
