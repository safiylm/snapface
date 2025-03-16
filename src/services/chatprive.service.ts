import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from 'src/models/message.model';
import { Conversation } from 'src/models/conversation';


@Injectable({
  providedIn: 'root'
})
export class ChatPriveService {

  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:4110');
    /*
        this.socket.on('connection', () => {
          console.log('✅ Connecté au serveur WebSocket');
        });
    
        this.socket.on('disconnect', (error) => {
          console.error('❌ Erreur de connexion WebSocket :', error);
        });
        */
  }

  receiveMessagesPrive(): Observable<Message[]> {
    return new Observable(observer => {
      this.socket.on('receiveprivateMessage', (msg) => observer.next(msg));
    });
  }

  joinRoom(userId: string) {
    this.socket.emit('joinRoom', userId);
  }

  sendMessagePrivee(sender: string, conversationId: string, text: string) {
    this.socket.emit('privateMessage', { sender, conversationId, text });
  }

  getMessageHistory(conversationId: string) {
    return this.http.get(`http://localhost:4100/messages/?conversationId=${conversationId}`);
  }

  getUsersWeHaveConversation(userId: string):Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`http://localhost:4100/conversations/?userId=${userId}`);
  }

  getConversationById(id: string):Observable<Conversation> {
    return this.http.get<Conversation>(`http://localhost:4100/conversation/?id=${id}`);
  }

  createConversation(sender: string, receiver: string): Observable<Conversation> {
    return this.http
      .post<Conversation>(
        `http://localhost:4100/conversation/create`,
        {"sender": sender, "receiver":receiver})
  }

  markAsSeen(conversationId: string): Observable<any> {
    return this.http
      .post<any>(
        `http://localhost:4100/message/markasseen`,
        {"conversationId": conversationId})
  }
}
