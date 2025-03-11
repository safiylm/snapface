import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChatPriveService } from '../../services/chatprive.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-chat-prive',
  templateUrl: './chat-prive.component.html',
  styleUrls: ['./chat-prive.component.scss'],
  imports: [FormsModule, NgFor, NgIf]
})

export class ChatPriveComponent implements OnInit {
  message = ""
  messages: any[] = [];
  sender: string = localStorage.getItem("userId")?.toString() as string;
  @Input() conversationId !: string ;

  constructor(private chatService: ChatPriveService,
  ) { }

  ngOnInit() {
    this.sender = localStorage.getItem("userId")?.toString() as string;  // ChatPublicServiceRemplace par l'ID réel de l'utilisateur

    this.chatService.joinRoom(this.sender);
    if(this.conversationId)
    // Charger l'historique des messages
    this.chatService.getMessageHistory(this.conversationId).subscribe((data: any) => {
      this.messages = data;
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["conversationId"]  ) {
      this.chatService.getMessageHistory(changes["conversationId"].currentValue).subscribe((data: any) => {
        this.messages = data;
      });
    }
  }

  sendMessagePrivee() {
    if (this.message.trim() && this.conversationId.trim()) {
      this.chatService.sendMessagePrivee(this.sender, this.conversationId, this.message)
      this.messages.push({ sender: this.sender, text: this.message });
      this.message = '';

    }
  }

  createConversation(){
    /*this.chatService.createConversation(this.receiverId, this.sender).subscribe({
      next:data=>{
        console.log(data);
      }
    })*/
  }


}

