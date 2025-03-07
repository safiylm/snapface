import { Component, Input, OnInit } from '@angular/core';
import { ChatPriveService  } from '../../services/chatprive.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';


@Component({
  standalone:true,
  selector: 'app-chat-prive',
  templateUrl: './chat-prive.component.html',
  styleUrls: ['./chat-prive.component.scss'], 
  imports:[NgFor, FormsModule, NgIf]
})

export class ChatPriveComponent implements OnInit {
    message = '******';
    messages: any[] = [];
    sender : string = localStorage.getItem("userId")?.toString() as string;  

    
    @Input() receiverId!: string;

    constructor(private chatService: ChatPriveService, 
    ) {}
  
    ngOnInit() {
      this.sender = localStorage.getItem("userId")?.toString() as string;  // ChatPublicServiceRemplace par l'ID réel de l'utilisateur

      this.chatService.joinRoom(this.sender);
  
      // Charger l'historique des messages
      this.chatService.getMessageHistory(this.sender, this.receiverId).subscribe((data: any) => {
        this.messages = data;
      });
  
      // Recevoir les nouveaux messages en temps réel
      this.chatService.receiveMessages().subscribe(msg => {
        this.messages.push(msg);
      });

    }
  
    sendMessage() {
      if (this.message.trim()) {
        this.chatService.sendMessage(this.sender, this.receiverId, this.message)
        .subscribe({
          
        })
      //  this.messages.push({ sender: this.sender, text: this.message });
        this.message = '';
      }
    }


  }
  
