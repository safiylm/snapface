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
    this.socket = io('http://localhost:4110');

    this.socket.on('connection', () => {
      console.log('✅ Connecté au serveur WebSocket');
    });

    this.socket.on('disconnect', (error) => {
      console.error('❌ Erreur de connexion WebSocket :', error);
    });
  }

  receiveMessagesPrive(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('receiveprivateMessage', (msg) => observer.next(msg));
    });
  }
  
  joinRoom(userId: string) {
    this.socket.emit('joinRoom', userId);
  }

  sendMessagePrivee(sender: string, receiver: string, text: string) {
    this.socket.emit('privateMessage', { sender, receiver, text });
 }

  getMessageHistory(sender: string, receiver: string) {
    return this.http.get(`http://localhost:4100/messages/?sender=${sender}&receiver=${receiver}`);
  }
}
