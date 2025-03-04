import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(private http: HttpClient) {}
  
  private socket = io('http://localhost:4100'); // URL du backend
/**Discusiion instantane ouvert à tout le monde  */
  sendMessagePublic(message: any) {
    this.socket.emit('message', message);
  }

  receiveMessagesPublic(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message', (msg) => observer.next(msg));
    });
  }

  
  joinRoom(userId: string) {
    this.socket.emit('joinRoom', userId);
  }

  sendMessage(sender: string, receiver: string, text: string) {
    this.socket.emit('privateMessage', { sender, receiver, text });
  }

  receiveMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('receiveMessage', (msg) => observer.next(msg));
    });
  }

  getMessageHistory(sender: string, receiver: string) {
    return this.http.get(`http://localhost:4100/messages/?sender=${sender}&receiver=${receiver}`);
  }
}//
