// socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { url } from './url'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    const userId = localStorage.getItem('userId')?.toString() as string ; // remplace par l'ID réel
    this.socket = io(
       url, {
    //  query: { userId }, 
       withCredentials: true
    });

    this.socket.on('disconnect', (reason) => {
  console.warn('Socket déconnecté :', reason);
  if (reason === 'io server disconnect') {
    // serveur a coupé : essayer de se reconnecter
    this.socket.connect();
  }
});

  }

  onUserOnline(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('user-online', (userId: string) => {
        observer.next(userId);
      });
    });
  }

  onUserOffline(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('user-offline', (userId: string) => {
        observer.next(userId);
      });
    });
  }
}
