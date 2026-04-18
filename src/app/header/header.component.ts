import { NgIf } from '@angular/common';
import {  Component, HostListener, OnInit, signal } from '@angular/core';
import { AvatarUserComponent } from "./avatar-user/avatar-user.component";
import { ListFollowRequestComponent } from "../user/list-follow-request/list-follow-request.component";
import { UserService } from 'src/services/user-service';
import { Router } from '@angular/router';
import { ChatPriveService } from 'src/services/chatprive.service';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    NgIf,
    AvatarUserComponent, AvatarUserComponent,
    ListFollowRequestComponent,

  ],
})

export class HeaderComponent implements OnInit {
  readonly panelOpenState = signal(false);

  isLoggedIn: boolean = false;
  nbConversationWithNewMessages: any;

  constructor(private userService: UserService,
    private route: Router, protected chatService: ChatPriveService
  ) {
  }

  ngOnInit() {
    this.isLoggedIn = false;

    if (localStorage.getItem('userconnected')!= null) {
      this.isLoggedIn = true;
    }

    this.chatService.getUsersWeHaveConversation(localStorage.getItem('userId')?.toString() as string)
      .subscribe(
        (data) => {
          for (let conv of data) {
            this.chatService.getNewMessagesByConversationId(conv._id)
              .subscribe(
                (dataa) => {
                  if (dataa.length > 0) {
                    this.nbConversationWithNewMessages = this.nbConversationWithNewMessages + 1;
                  }
                }
              )
          }
        })
  }

  logout() {
    this.userService.logout().subscribe(
      (data: any) => {
        if (data == "ok") {
          localStorage.setItem('userconnected', '');
          localStorage.removeItem('userconnected')
          location.href = ''
        }
      })
  }

  goTo(url_: string) {
    document.location.href = url_
  }


}
