import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from 'src/models/user.model';
import { SocketService } from 'src/services/socket-service';

@Component({
  standalone: true,
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  imports: [NgIf, NgClass]
})
export class UserComponent {
  
  @Input() user !: User;

  onlineUserIds = new Set<string>();

  constructor(private socketService: SocketService) { }

  ngOnInit() {

    this.socketService.onUserOnline().subscribe(userId => {
      this.onlineUserIds.add(userId);
    });

    this.socketService.onUserOffline().subscribe(userId => {
      this.onlineUserIds.delete(userId);
    });
  }

  get PhotoProfil() {
    return (this.user && this.user.photos_profil) ? this.user.photos_profil : null
  }

  get UserName() {
    return (this.user && this.user.firstName && this.user.lastName) ? this.user.firstName + " " + this.user.lastName : null
  }
}
