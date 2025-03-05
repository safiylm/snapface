import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from 'src/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatPriveService {

  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:4100');

    this.socket.on('connect', () => {
      console.log('✅ Connecté au serveur WebSocket');
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ Erreur de connexion WebSocket :', error);
    });
  }
  

  
  joinRoom(userId: string) {
    this.socket.emit('joinRoom', userId);
  }

  sendMessage(sender: string, receiver: string, text: string):Observable<Message> {
   // this.socket.emit('privateMessage', { sender, receiver, text });
      return this.http
         .post<Message>(
           "http://localhost:4100/message/create" ,
            {sender, receiver, text}
         )
   
  }

  receiveMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('receiveMessage', (msg) => observer.next(msg));
    });
  }

  getMessageHistory(sender: string, receiver: string) {
    return this.http.get(`http://localhost:4100/messages/?sender=${sender}&receiver=${receiver}`);
  }
}
