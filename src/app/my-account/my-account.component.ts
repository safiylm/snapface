import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service'
import { User } from '../../models/user.model'
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  id: string = localStorage.getItem('userId')?.toString() as string;

  isDisplayPosts: boolean = true;
  isDisplayCreateNewPost: boolean = false;
  isDisplayUserEditForm: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  data?: User;

  ngOnInit() {
    this.id = localStorage.getItem('userId')?.toString() as string;
    if(this.router.url == "/mon-compte/edit"){
      this.displayUserEditForm()
    }
    if(this.router.url == "/mon-compte/create-new-post"){
      this.displayCreateNewPost()
    }
  }


  
  displayPosts() {
    this.isDisplayPosts = true;
    this.isDisplayCreateNewPost = false;
    this.isDisplayUserEditForm = false;
    this.router.navigate(['/mon-compte']);
  }


  displayCreateNewPost() {
    this.isDisplayPosts = false;
    this.isDisplayCreateNewPost = true;
    this.isDisplayUserEditForm = false;
    this.router.navigate(['/mon-compte/create-new-post']);
  }


  displayUserEditForm() {
    this.isDisplayPosts = false;
    this.isDisplayCreateNewPost = false;
    this.isDisplayUserEditForm = true;
    this.router.navigate(['/mon-compte/edit']);
  }


  logout(){
    this.userService.logout();  
    this.router.navigate(['/']);
  }
}
