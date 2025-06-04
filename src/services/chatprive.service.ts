import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from 'src/models/message.model';
import { Conversation } from 'src/models/conversation';
import { url } from './url'


@Injectable({
  providedIn: 'root'
})

export class ChatPriveService {

  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io(url ,{
      withCredentials: true
    });
  }


  receiveMessagePrivate(): Observable<any> {

    return new Observable(observer => {
      this.socket.on('newMessage', (msg) => {
        observer.next(msg)
        console.log(msg)
      });
    });
  }

  joinRoom(userId: string) {
    this.socket.emit('joinRoom', userId);
  }


  sendMessagePrivee(sender: string, receiver: string, conversationId: string, text: string, postId: string) {
    this.joinRoom(sender);
    this.joinRoom(receiver);

    this.socket.emit('privateMessage',
      { sender, receiver, conversationId, text, postId })
  }


  getMessageHistory(conversationId: string) {
    return this.http.get(url + `/messages?conversationId=${conversationId}`);
  }

  getLastMessage(conversationId: string) {
    return this.http.get<Message>(url + `/last-message?conversationId=${conversationId}`);
  }


  editMessage(id: string, text: string) {
    return this.http.post(url + `/message/edit`, { "id": id, "text": text });
  }

  deleteMessage(id: string) {
    return this.http.post(url + `/message/delete`, { "id": id });
  }

  deleteConversation(conversationId: string) {
    return this.http.post(url + `/conversation/delete`, { "conversationId": conversationId });
  }

  getUsersWeHaveConversation(userId: string): Observable<Conversation[]> {
    this.getNumberOfNewMessagesByUserId(userId)
    return this.http.get<Conversation[]>(url + `/conversations/?userId=${userId}`);
  }

  getConversationById(id: string): Observable<Conversation> {
    return this.http.get<Conversation>(url + `/conversation/?id=${id}`);
  }
  numberofmessage: number = 0;

  getNumberOfNewMessagesByUserId(userid: string) {
    this.http.get<Conversation[]>(url + `/conversations/?userId=${userid}`)
      .subscribe(
        (data: Conversation[]) => {
          for (let d of data) {
            this.http.get<Conversation[]>(url + "/conversation/nbnewmsj?id=" + d._id)
              .subscribe(
                (dataa) => {
                  if (dataa.length > 0) {
                    this.numberofmessage = this.numberofmessage + 1;
                  }
                }
              )
          }
        })
    setTimeout(() => {
      localStorage.setItem('nbConversationWithNewMessages', this.numberofmessage.toString())
    }, 1200)

  }


  createConversation(sender: string, receiver: string): Observable<Conversation> {
    return this.http
      .post<any>(
        url + `/conversation/create`,
        { "sender": sender, "receiver": receiver })
  }

  markAsSeen(conversationId: string): Observable<any> {
    return this.http
      .post<any>(
        url + `/message/markasseen`,
        { "conversationId": conversationId })
  }

  getNewMessagesByConversationId(conversationId: string) {
    return this.http
      .get<Message[]>(
        url + "/conversation/nbnewmsj?id=" + conversationId)
  }


}
