import { NgIf } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
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

  @Input() userId !: string;
  @Input() conversationId !: string;
  @Input() offcanvas !: string;
  nbNewMessage !: number;
    constructor(private chatservice: ChatPriveService,private userService: UserService) { }

  @Output() newItemEvent = new EventEmitter<string>();
  user !: User;

  choiceConversation(value: string) {
    this.newItemEvent.emit(value);
  }


  ngOnInit() {
    this.retrieveUser(this.userId)
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
  getNumberOfNewMessage(){
    this.chatservice.getNewMessagesByConversationId(this.conversationId)
    .subscribe((data: Message[]) => {
      console.log(data)
      this.nbNewMessage = data.length
    });
    
  }
}
