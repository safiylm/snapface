import { Injectable } from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commentaire } from '../models/commentaire.model';
import { User } from '../models/user.model';
import { url } from './url'
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class CommentaireService {

  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io(url, {
      withCredentials: true
    });
  }

  
  joinRoom(userId: string) {
    this.socket.emit('joinRoom', userId);
  }

  getCommentaireByPostId(id: string): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(url + "/api/commentairesByPostId?id=" + id);
  }

  getUserByUserId(id: string): Observable<User> {
    return this.http.get<User>(url + "/api/userid?id=" + id);
  }


  create(formData: Commentaire) {
    this.socket.emit("create_comment", formData)
  }

  delete(commentId: string, postId: string) {
    this.socket.emit("delete_comment", { "_id": commentId, "postId": postId, "userId": localStorage.getItem("userId")?.toString() })
  }

  edit(form: Commentaire) {
    this.socket.emit("edit_comment", { "_id": form._id, "postId": form.postId, "text": form.text })
  }

  getCommentsWithSocket(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('comments', (msg) => {
        observer.next(msg)
      });
    });
  }

  checkTotalComments(id: string) { }


}
