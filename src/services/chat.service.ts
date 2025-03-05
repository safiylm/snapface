import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from 'src/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatPublicService {

  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:4110');

    this.socket.on('connect', () => {
      console.log('✅ Connecté au serveur WebSocket');
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ Erreur de connexion WebSocket :', error);
    });
  }
  
/**Discusiion instantane ouvert à tout le monde  */
  sendMessagePublic(message: any) {
    this.socket.emit('message', message);
  }

  receiveMessagesPublic(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message', (msg) => observer.next(msg));
    });
  }

  
}
