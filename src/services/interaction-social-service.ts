import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InteractionSociale } from '../models/interaction.sociale.model';
import { url } from './url'

import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class InteractionSocialeService {

  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io(url, {
      withCredentials: true
    });
  }

  joinRoom(userId: string) {
    this.socket.emit('joinRoom', userId);
  }


  create(postId: string, interaction: string) {

    this.socket.emit('add',
      {
        'postId': postId,
        'userId': JSON.parse( localStorage.getItem("userconnected")?.toString() as string).userId,
        "interaction": interaction
      },
    )
  }

  remove(postId: string, interactionId: string, interaction: string) {

    this.socket.emit("remove",
      {
        'postId': postId,
        'userId':  JSON.parse( localStorage.getItem("userconnected")?.toString() as string).userId,
        'interactionId': interactionId,
        "interaction": interaction

      }
    )
  }

  getInteractionsWithSocket() {
    return new Observable(observer => {
      this.socket.on('interactions', (msg) => {
        observer.next(msg)
      });
    });
  }



  /*************************************************************************** */


  getAllLikesByPostId(postId: string) {
    return this.http.get<InteractionSociale[]>(
      url + "/api/interaction/likesByPostId?postId=" + postId)
  }


  getAllInteractionsByUserId(interactions: string, userid: string) {
 return this.http.get<InteractionSociale[]>(
      url + "/api-interaction-by-userId?userId=" + userid+ "&interactions="+interactions)
 
  } 

  getLikesCountByPostId(postId: string) {
    return this.http.get<any>(
      url + "/api/interaction/likesCount?postId=" + postId)
  }


  interactionExist
    (postId: string, userId: string) {
    return this.http.get<InteractionSociale>(
      url + "/api/interaction/exist?postId=" + postId + "&userId=" + userId )
  }

}

