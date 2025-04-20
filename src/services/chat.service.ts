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
  //  this.socket = io('http://localhost:4100');
    this.socket = io('https://snapface.onrender.com');
    
  }

  /**Discusiion instantane ouvert à tout le monde  */
  sendMessagePublic(message: any) {
    this.socket.emit('publicMessage', message);
  }

  receiveMessagesPublic(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('publicMessage', (msg) => observer.next(msg));
    });
  }




}
