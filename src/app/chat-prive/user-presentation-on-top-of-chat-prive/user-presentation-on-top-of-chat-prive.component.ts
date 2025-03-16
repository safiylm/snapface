import { NgIf } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user-service';

@Component({
  standalone: true,
  selector: 'app-user-presentation-on-top-of-chat-prive',
  templateUrl: './user-presentation-on-top-of-chat-prive.component.html',
  styleUrls: ['./user-presentation-on-top-of-chat-prive.component.scss'],
  imports:[NgIf]
})
export class UserPresentationOnTopOfChatPriveComponent {

  @Input() userId !: string;

  constructor(private userService: UserService) { }

  user !: User;

  ngOnInit() {
    this.retrieveUser(this.userId)
  }

  ngOnChanges(changes: SimpleChanges){
    if( changes['userId']){
      this.retrieveUser(this.userId)
    }
  }

  retrieveUser(userId: string): void {
    this.userService.getUser(userId)
      .subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (e) => console.error(e)
      });
  }

  get PhotoProfil() {
    return (this.user && this.user.photos_profil) ? this.user.photos_profil : null
  }

  get UserName() {
    return (this.user && this.user.firstName && this.user.lastName) ? this.user.firstName + " " + this.user.lastName : null
  }
}

