import { Component, OnInit } from '@angular/core';
import { ChatPublicService } from "../../../services/chat.service"
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  standalone:true, 
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports:[FormsModule, NgFor]
})

export class ChatComponent implements OnInit {
  message = '';
  messages: string[] = [];

  constructor(private chatSerive: ChatPublicService) {}


  ngOnInit() {
    this.chatSerive.receiveMessagesPublic().subscribe(msg => {
      this.messages.push(msg);
      this.showNotification(msg);
    });
  }

  
  sendMessage() {
    if (this.message.trim()) {
    //  this.chatSerive.sendMessagePrivee("662eb361c2fd9ad3238d752a", "662eb361c2fd9ad3238d752a","67d4932175becdb436d19d0d","On essai");
     this.chatSerive.sendMessagePublic(this.message);
      this.message = '';
    }
  }

  showNotification(msg: string) {
    if (Notification.permission === 'granted') {
      new Notification('Nouveau message', { body: msg });
    }
  }
}
