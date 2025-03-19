import { NgIf } from '@angular/common';
import { Component, Input, signal, SimpleChanges } from '@angular/core';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user-service';
import { Output, EventEmitter } from '@angular/core';
import { ChatPriveService } from 'src/services/chatprive.service';
import { Message } from 'src/models/message.model';

@Component({
  standalone: true,
  selector: 'app-item-user-with-last-message',
  templateUrl: './item-user-with-last-message.component.html',
  styleUrls: ['./item-user-with-last-message.component.scss'],
  imports: [NgIf]
})
export class ItemUserWithLastMessageComponent {

  @Input() users !: string[];
  @Input() conversationId !: string;
  @Input() offcanvas !: string;
  nbNewMessage !: number;
  nbConversationWithNewMessages = 0;

  constructor(private chatservice: ChatPriveService, private userService: UserService) { }

  @Output() newItemEvent = new EventEmitter<string>();
  user !: User;

  choiceConversation(value: string) {
    this.newItemEvent.emit(value);
  }


  ngOnInit() {
    if (this.users[0] == localStorage.getItem("userId")?.toString() as string)
      this.retrieveUser(this.users[1])
    else
      this.retrieveUser(this.users[0])
    this.getNumberOfNewMessage()
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

  getNumberOfNewMessage() {
    this.chatservice.getNewMessagesByConversationId(this.conversationId)
      .subscribe((data: Message[]) => {
        this.nbNewMessage = data.length

        if (this.nbNewMessage > 0) {
          var a = localStorage.getItem('nbConversationWithNewMessages')?.toString() as string;
          var y: number = +a;
          y = y + 1;

          localStorage.setItem("nbConversationWithNewMessages", y.toString() as string)
          console.log(localStorage.getItem('nbConversationWithNewMessages'))

        }

      })
  }

}
