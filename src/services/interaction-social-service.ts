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

    this.joinRoom(postId);
    this.joinRoom(localStorage.getItem('userId')?.toString() as string);

    this.socket.emit('newLike',
      {
        'postId': postId,
        'userId': localStorage.getItem('userId'),
      },)
  }

  removeLike(postId: string, interactionId: string) {
    this.joinRoom(postId);
    this.joinRoom(localStorage.getItem('userId')?.toString() as string);

    this.socket.emit('disLike', {
      'postId': postId,
      'userId': localStorage.getItem('userId'),
      'interactionId': interactionId
    },
    )
  }

  getNewLikeWithSocket() {
    return new Observable(observer => {
      this.socket.on('newLike_', (msg) => {
        observer.next(msg)
      });
    });
  }


  getDisLikeWithSocket() {

    return new Observable(observer => {
      this.socket.on('disLike_', (msg) => {
        observer.next(msg)
      });
    });
  }

  /*************************************************************************** */

  addPoint(postId: string) {
    
      //  url + "/api/interaction/pointsAdd",
       
    this.socket.emit('point',
      {
        'postId': postId,
        'userId': localStorage.getItem('userId')
      },
    )

  }

  removePoints(postId: string, interactionId: string) {
 // pointsRemove 
       this.socket.emit("dispoint",
      {
        'postId': postId,
        'userId': localStorage.getItem('userId'),
        'interactionId': interactionId
      }
    )
  }


  getNewPointWithSocket() {

    return new Observable(observer => {
      this.socket.on('point_', (msg) => {
        observer.next(msg)
      });
    });
  }


  getUnPointWithSocket() {

    return new Observable(observer => {
      this.socket.on('dispoint_', (msg) => {
        observer.next(msg)
      });
    });
  }


  /*************************************************************************** */

  addEnregistrement(postId: string) {

    this.socket.emit('save',
      {
        'postId': postId,
        'userId': localStorage.getItem('userId')
      },
    )
  }

  removeEnregistrement(postId: string, interactionId: string) {
    this.socket.emit("unsave",
      {
        'postId': postId,
        'userId': localStorage.getItem('userId'),
        'interactionId': interactionId
      }
    )
  }

  getNewSaveWithSocket() {
    return new Observable(observer => {
      this.socket.on('save_', (msg) => {
        observer.next(msg)
      });
    });
  }


  getUnSavedWithSocket() {

    return new Observable(observer => {
      this.socket.on('unsave_', (msg) => {
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

