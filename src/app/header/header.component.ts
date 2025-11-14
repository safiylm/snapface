import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, OnInit, signal } from '@angular/core';
import { ConversationListComponent } from '../chat/conversation-list/conversation-list.component';
import { AvatarUserComponent } from "./avatar-user/avatar-user.component";
import { ListFollowRequestComponent } from "../user/list-follow-request/list-follow-request.component";
import { ChatPriveService } from 'src/services/chatprive.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user-service';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    NgIf, ConversationListComponent,
    AvatarUserComponent, AvatarUserComponent,
    ListFollowRequestComponent,
    // MatAccordion, 
    MatExpansionModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HeaderComponent implements OnInit {
  readonly panelOpenState = signal(false);

  isLoggedIn: boolean = false;
  nbConversationWithNewMessages: number = 0;

  constructor(private chatService: ChatPriveService, private userService: UserService,
    private route: Router,
  ) {
  }
  ngOnInit() {
    if (window.localStorage.getItem('isLoggedIn') == "true") {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
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
          localStorage.setItem('isLoggedIn', 'false');
          localStorage.setItem('userId', '');
          localStorage.removeItem('userId')
          localStorage.removeItem('token');
          this.route.navigate(['/']);
        }
      })
  }

  goTo(url_: string) {
    document.location.href = url_
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  }


}
