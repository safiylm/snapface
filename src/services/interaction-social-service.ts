import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InteractionSociale } from '../models/interaction.sociale.model';
import { url } from './url'


@Injectable({
  providedIn: 'root'
})

export class InteractionSocialeService {

  constructor(private http: HttpClient) { }

  addLike(postId: string): Observable<any> {

    return this.http
      .post(
        url + "/api/interaction/likesAdd",
        {
          'postId': postId,
          'userId': localStorage.getItem('userId')
        },
      )
  }

  removeLike(postId: string, interactionId: string): Observable<any> {
    return this.http
      .post(
        url + "/api/interaction/likesRemove",
        {
          'postId': postId,
          'userId': localStorage.getItem('userId'),
          'interactionId': interactionId
        },
      )
  }

  addPoints(postId: string): Observable<any> {
    return this.http
      .post(
        url + "/api/interaction/pointsAdd",
        {
          'postId': postId,
          'userId': localStorage.getItem('userId')
        },
      )
  }

  removePoints(postId: string, interactionId: string): Observable<any> {
    return this.http
      .post(
        url + "/api/interaction/pointsRemove",
        {
          'postId': postId,
          'userId': localStorage.getItem('userId'),
          'interactionId': interactionId
        }
      )
  }

  addEnregistrement(postId: string): Observable<any> {
    return this.http
      .post(
        url + "/api/interaction/enregistrementAdd",
        {
          'postId': postId,
          'userId': localStorage.getItem('userId')
        },
      )
  }

  removeEnregistrement(postId: string, interactionId: string): Observable<any> {
    return this.http
      .post(
        url + "/api/interaction/enregistrementRemove",
        {
          'postId': postId,
          'userId': localStorage.getItem('userId'),
          'interactionId': interactionId
        }
      )
  }


  getAllLikesByPostId(postId: string) {
    return this.http.get<InteractionSociale[]>(
      url + "/api/interaction/likesByPostId?postId=" + postId)
  }

  getAllPointsByPostId(postId: string) {
    return this.http.get<InteractionSociale[]>(
      url + "/api/interaction/pointsByPostId?postId=" + postId)
  }

  getAllLikesByUserId(userId: string) {
    return this.http.get<InteractionSociale[]>(
      url + "/api/interaction/likesByUserId?userId=" + userId)
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

