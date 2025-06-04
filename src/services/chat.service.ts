import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { url } from './url'

@Injectable({
  providedIn: 'root'
})
export class ChatPublicService {

  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io(url );
    
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
