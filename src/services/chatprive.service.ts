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
url= //"http://localhost:4100"
'https://snapface.onrender.com'
  constructor(private http: HttpClient) {
  //  this.socket = io('http://localhost:4100');
     this.socket = io('https://snapface.onrender.com');
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


  sendMessagePrivee(sender: string, receiver: string, conversationId: string, text: string) {

    this.socket.emit('privateMessage', { sender, receiver, conversationId, text })
    this.socket.emit("joinRoom", "662eb361c2fd9ad3238d752a");  // Register this client with a user ID
    this.joinRoom(sender)
    this.joinRoom(receiver)

  }


  getMessageHistory(conversationId: string) {
    return this.http.get(this.url+`/messages/?conversationId=${conversationId}`);
  }

  getLastMessage(conversationId: string) {
    return this.http.get<Message>(this.url+`/last-message/?conversationId=${conversationId}`);
  }


  editMessage(id: string, text: string) {
    return this.http.post(this.url+`/message/edit`, { "id": id, "text": text });
  }

  deleteMessage(id: string) {
    return this.http.post(this.url+`/message/delete`, { "id": id });
  }

  deleteConversation(conversationId: string) {
    return this.http.post(this.url+`/conversation/delete`, { "conversationId": conversationId });
  }

  getUsersWeHaveConversation(userId: string): Observable<Conversation[]> {
    this.getNumberOfNewMessagesByUserId(userId)
    return this.http.get<Conversation[]>(this.url+`/conversations/?userId=${userId}`);
  }

  getConversationById(id: string): Observable<Conversation> {
    return this.http.get<Conversation>(this.url+`/conversation/?id=${id}`);
  }
  numberofmessage: number = 0;

  getNumberOfNewMessagesByUserId(userid: string) {
    this.http.get<Conversation[]>(this.url+`/conversations/?userId=${userid}`)
      .subscribe(
        (data: Conversation[]) => {
          for (let d of data) {
            this.http.get<Conversation[]>(this.url+"/conversation/nbnewmsj?id=" + d._id)
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
        this.url+`/conversation/create`,
        { "sender": sender, "receiver": receiver })
  }

  markAsSeen(conversationId: string): Observable<any> {
    return this.http
      .post<any>(
        this.url+`/message/markasseen`,
        { "conversationId": conversationId })
  }

  getNewMessagesByConversationId(conversationId: string) {
    return this.http
      .get<Message[]>(
        this.url+ "/conversation/nbnewmsj?id=" + conversationId)
  }


}
