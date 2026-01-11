import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { UserService } from '../../../services/user-service'
import { User } from '../../../models/user.model'
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StatistiqueUserComponent } from '../statistique-user/statistique-user.component';
import { NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { ButtonFollowComponent } from '../button-follow/button-follow.component';
import { EditPhotosComponent } from "../edit/user-data-update/edit-photos/edit-photos.component";
import { SignalementService } from 'src/services/signalement-service';
import { FormsModule } from '@angular/forms';
import { transition, style, animate, trigger } from '@angular/animations';
import { SignalerUserComponent } from "../signaler-user/signaler-user.component";
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { HeaderSnapPhotosComponent } from '../header-snap-photos/header-snap-photos.component';
import { ChatPriveService } from 'src/services/chatprive.service';
import { Conversation } from 'src/models/conversation';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

const enterTransition = transition(':enter', [
  style({
    opacity: 0
  }),
  animate('0.5s ease-in', style({
    opacity: 1
  }))
]);

const leaveTrans = transition(':leave', [
  style({
    opacity: 1
  }),
  animate('0.5s ease-out', style({
    opacity: 0
  }))
])

const fadeIn = trigger('fadeIn', [
  enterTransition
]);

const fadeOut = trigger('fadeOut', [
  leaveTrans
]);


@Component({
  standalone: true,
  selector: 'app-header-snap',
  templateUrl: './header-snap.component.html',
  styleUrls: ['./header-snap.component.scss'],
  imports: [StatistiqueUserComponent, NgIf, ButtonFollowComponent, TitleCasePipe,
    FormsModule, EditPhotosComponent, SignalerUserComponent, NgClass
  , MatButtonModule, MatMenuModule, HeaderSnapPhotosComponent],
  animations: [
    fadeIn,
    fadeOut
  ]
})


export class HeaderSnapComponent implements OnInit {

  @Input() id !: string;
  @Input() isAbonnee !: boolean;
  isMe: boolean = false;
  user !: User;
  subscription !: Subscription;

  @Output() choixAffichageEvent = new EventEmitter<string>();
  sendNewMessage = false;


  choix(choix: string) {
    this.choixAffichageEvent.emit(choix)
  }

  
  goTo(url_:string){
    document.location.href = url_
  }
  
  constructor(private userService: UserService, private signalementService: SignalementService, //private messageService: ChatPriveService,

    private router: ActivatedRoute, private route: Router, ) {

    this.user = router.snapshot.data['user'];
  }

  ngOnInit() {

    if ( JSON.parse(localStorage.getItem('userconnected')?.toString() as string).userId == this.id) {
      this.isMe = true;
    }
  }

  get UserName() {
    return (this.user && this.user.firstName && this.user.lastName) ? this.user.firstName + " " + this.user.lastName : null
  }

    createConversation() {
     
 /*   this.messageService.getUsersWeHaveConversation( JSON.parse(localStorage.getItem('userconnected')as string ).userId)
      .subscribe((data: Conversation[]) => {
        if (data) {
          if (data.length == 0) {
            this.sendNewMessage = true
          } else
            for (let conv of data) {
              if (conv.speaker.includes(this.user._id) == true)
                location.href = '/chat/' + conv._id;
              else {
                this.sendNewMessage = true
              }
            }
        }
      });
      */

  }

}
