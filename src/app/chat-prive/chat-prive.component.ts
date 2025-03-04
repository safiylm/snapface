 import { Component, OnInit } from '@angular/core';
  import { WebsocketService } from '../../services/websocket.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
  

@Component({
  standalone:true,
  selector: 'app-chat-prive',
  templateUrl: './chat-prive.component.html',
  styleUrls: ['./chat-prive.component.scss'], 
  imports:[NgFor, FormsModule]
})
export class ChatPriveComponent implements OnInit {
    message = '';
    messages: any[] = [];
    sender = '662eb2a1c2fd9ad3238d7528';  // Remplace par l'ID réel de l'utilisateur
    receiver = '67750e706164bea251fc0562'; // L'ID du destinataire
  
    constructor(private websocketService: WebsocketService) {}
  
    ngOnInit() {
      this.websocketService.joinRoom(this.sender);
  
      // Charger l'historique des messages
      this.websocketService.getMessageHistory(this.sender, this.receiver).subscribe((data: any) => {
        this.messages = data;
      });
  
      // Recevoir les nouveaux messages en temps réel
      this.websocketService.receiveMessages().subscribe(msg => {
        this.messages.push(msg);
      });
    }
  
    sendMessage() {
      if (this.message.trim()) {
        this.websocketService.sendMessage(this.sender, this.receiver, this.message);
        this.messages.push({ sender: this.sender, text: this.message });
        this.message = '';
      }
    }
  }
  
