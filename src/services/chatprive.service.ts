import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message.model';
import { Conversation } from '../models/conversation';
import { url } from './url'


@Injectable({
  providedIn: 'root'
})

export class ChatPriveService {

  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io(url, {
      withCredentials: true
    });
  }

  joinRoom(userId: string) {
    this.socket.emit('joinRoom', userId);
  }

  create(sender: string, receiver: string, conversationId: string, text: string, postId: string) {
    this.socket.emit('createPrivateMessage',
      { sender, receiver, conversationId, text, postId , "action":"create"})
  }

  getPrivateMessagesWithSocket(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('messages', (msg) => {
        observer.next(msg)
      });
    });
  }

  edit(sender: string, receiver: string, _id: string, text: string, conversationId: string) {
    this.socket.emit('editPrivateMessage',
      { sender, receiver, _id, text, conversationId, "action":"edit" })
  }

  delete(sender: string, receiver: string, _id: string, conversationId: string) {
    this.socket.emit('deletePrivateMessage',
      { receiver, _id, conversationId, "action":"delete" })
  }

  getMessageHistory(conversationId: string) {
    return this.http.get(url + `/messages?conversationId=${conversationId}`);
  }

  getLastMessage(conversationId: string) {
    return this.http.get<Message>(url + `/last-message?conversationId=${conversationId}`);
  }


  deleteConversation(conversationId: string) {
    return this.http.post(url + `/conversation/delete`, { "conversationId": conversationId });
  }

  getUsersWeHaveConversation(userId: string): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(url + `/conversations/?userId=${userId}`);
  }

  getConversationById(id: string): Observable<Conversation> {
    return this.http.get<Conversation>(url + `/conversation/?id=${id}`);
  }


  createConversationWithFistMessage(sender: string, receiver: string, text: string): Observable<Conversation> {
    return this.http
      .post<any>(
        url + `/conversation/create`,
        { "sender": sender, "receiver": receiver, "text": text })
  }

  markAsSeen(conversationId: string ): Observable<any> {
    return this.http
      .post<any>(
        url + `/message/markasseen`,
        { "conversationId": conversationId, "userId": localStorage.getItem('userId')?.toString() as string })
  }

  getNewMessagesByConversationId(conversationId: string) {
    return this.http
      .get<any>(
        url + "/conversation/nbnewmsj?id=" + conversationId + "&userId=" + localStorage.getItem('userId')?.toString() as string)
  }



}