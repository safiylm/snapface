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
    this.receiveMessagesPrive()

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["conversationId"]  ) {
      console.log('La valeur a changé de', changes["conversationId"].previousValue, 'à', changes["conversationId"].currentValue);
      this.chatService.getMessageHistory(changes["conversationId"].currentValue).subscribe((data: any) => {
        this.messages = data;
        //  console.log(data)
      });
    }
  }

  sendMessagePrivee() {
    if (this.message.trim()) {
      this.chatService.sendMessagePrivee(this.sender, this.conversationId, this.message)
    
      this.messages.push({ sender: this.sender, text: this.message });
      this.message = '';
      this.receiveMessagesPrive()

    }
  }


  receiveMessagesPrive() {
    // Recevoir les nouveaux messages en temps réel
    this.chatService.receiveMessagesPrive().subscribe(msg => {
      this.messages.push(msg);
    });
  }

  createConversation(){
    /*this.chatService.createConversation(this.receiverId, this.sender).subscribe({
      next:data=>{
        console.log(data);
      }
    })*/
  }


}

