import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user-service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-item-user-with-last-message',
  templateUrl: './item-user-with-last-message.component.html',
  styleUrls: ['./item-user-with-last-message.component.scss'],
  imports: [NgIf]
})
export class ItemUserWithLastMessageComponent {

  @Input() userId !: string;
  @Input() conversationId !: string;

  constructor(private userService: UserService) { }

  @Output() newItemEvent = new EventEmitter<string>();
  user !: User;

  choiceConversation(value: string) {
    this.newItemEvent.emit(value);
  }

  ngOnInit() {
    this.retrieveUser()
  }
  retrieveUser(): void {
    this.userService.getUser(this.userId)
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
