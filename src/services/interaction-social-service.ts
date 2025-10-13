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

  /*************************************************************************** */


  addLike(postId: string)//: Observable<any>
  {
    this.socket.emit('add',
      {
        'postId': postId,
        'userId': localStorage.getItem('userId'),
        "interaction": "like"

      },)
  }

  removeLike(postId: string, interactionId: string) {

    this.socket.emit('remove', {
      'postId': postId,
      'userId': localStorage.getItem('userId'),
      'interactionId': interactionId,
      "interaction": "like"

    },
    )
  }



  /*************************************************************************** */

  addEnregistrement(postId: string) {

    this.socket.emit('add',
      {
        'postId': postId,
        'userId': localStorage.getItem('userId'),
        "interaction": "save"
      },
    )
  }

  removeEnregistrement(postId: string, interactionId: string) {
    this.joinRoom(postId);

    this.socket.emit("remove",
      {
        'postId': postId,
        'userId': localStorage.getItem('userId'),
        'interactionId': interactionId,
        "interaction": "save"

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

  getAllLikesByUserId(userId: string) {
    return this.http.get<InteractionSociale[]>(
      url + "/api/interaction/likesByUserId?userId=" + userId)
  }

  getAllPointsByPostId(postId: string) {
    return this.http.get<InteractionSociale[]>(
      url + "/api/interaction/pointsByPostId?postId=" + postId)
  }



  getAllEnregistrementsByUserId(userId: string) {
    return this.http.get<InteractionSociale[]>(
      url + "/api/interaction/enregistrementsByUserId?userId=" + userId)
  }


  getAllPointsByUserId(userId: string) {
    return this.http.get<InteractionSociale[]>(
      url + "/api/interaction/pointsByUserId?userId=" + userId)
  }

  getLikesCountByPostId(postId: string) {
    return this.http.get<any>(
      url + "/api/interaction/likesCount?postId=" + postId)
  }

  getPointsCountByPostId(postId: string) {
    return this.http.get<any>(
      url + "/api/interaction/pointsCount?postId=" + postId)
  }


  getIfUserAlreadyLikePost(postId: string, userId: string) {
    return this.http.get<InteractionSociale>(
      url + "/api/interaction/getIfUserAlreadyLikePost?postId=" + postId + "&userId=" + userId)
  }


  getIfUserAlreadyPointPost(postId: string, userId: string) {
    return this.http.get<InteractionSociale>(
      url + "/api/interaction/getIfUserAlreadyPointPost?postId=" + postId + "&userId=" + userId)
  }

  getIfUserAlreadySavePost
    (postId: string, userId: string) {
    return this.http.get<InteractionSociale>(
      url + "/api/interaction/getIfUserAlreadySavePost?postId=" + postId + "&userId=" + userId)
  }


}

