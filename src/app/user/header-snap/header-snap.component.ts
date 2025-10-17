import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { UserService } from '../../../services/user-service'
import { User } from '../../../models/user.model'
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StatistiqueUserComponent } from '../statistique-user/statistique-user.component';
import { NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { ButtonFollowComponent } from '../button-follow/button-follow.component';
import { EditPhotosComponent } from "../edit/user-data-update/edit-photos/edit-photos.component";
import { ChatPriveService } from 'src/services/chatprive.service';
import { Signalement } from 'src/models/signalement.model';
import { SignalementService } from 'src/services/signalement-service';
import { FormsModule } from '@angular/forms';
import { transition, style, animate, trigger } from '@angular/animations';
import { SignalerUserComponent } from "../signaler-user/signaler-user.component";
import { Conversation } from 'src/models/conversation';
import { DiscussionComponent } from 'src/app/chat/discussion/discussion.component';

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
    FormsModule, EditPhotosComponent, SignalerUserComponent, NgClass, DiscussionComponent],
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
  isDisplayPhotoViewerProfil !: boolean;
  isDisplayPhotoViewerBackground !: boolean;
  subscription !: Subscription;
  showEditPhotoProfil = false
  showEditPhotoBackground = false
  @Output() choixAffichageEvent = new EventEmitter<string>();
  sendNewMessage = false;

  choix(choix: string) {
    this.choixAffichageEvent.emit(choix)
  }

  constructor(private userService: UserService, private signalementService: SignalementService, private messageService: ChatPriveService,

    private router: ActivatedRoute, private route: Router, private renderer: Renderer2) {

    this.user = router.snapshot.data['user'];
  }

  ngOnInit() {
    // this.displayUser();
    this.isDisplayPhotoViewerProfil = false;
    this.isDisplayPhotoViewerBackground = false;

    if (localStorage.getItem('userId') == this.id) {
      this.isMe = true;
    }

  }

  ngAfterViewInit() {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.menuBtnClick) {
        this.menuOpen = false;
        this.hidePhotoViewerProfil();
        this.hidePhotoViewerBackground();
      }
      this.menuBtnClick = false;
    });
  }

  hidePhotoViewerProfil() {
    this.isDisplayPhotoViewerProfil = false;
  }

  hidePhotoViewerBackground() {
    this.isDisplayPhotoViewerBackground = false;
  }

  showPhotoViewerProfil() {
    this.isDisplayPhotoViewerProfil = true;
  }

  showPhotoViewerBackground() {
    this.isDisplayPhotoViewerBackground = true;
  }

  get UserName() {
    return (this.user && this.user.firstName && this.user.lastName) ? this.user.firstName + " " + this.user.lastName : null
  }
  get UserPhotoProfil() {
    return (this.user && this.user.photos_profil) ? this.user.photos_profil : null
  }

  get UserPhotoBackground() {
    return (this.user && this.user.photos_background) ? this.user.photos_background : null
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

  createConversation() {
    this.messageService.getUsersWeHaveConversation(localStorage.getItem('userId')?.toString() as string)
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

  }


  menuBtnClick: boolean = false;

  preventCloseOnClick() {
    this.menuBtnClick = true;
  }

  menuOpen: boolean = false;


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

}
