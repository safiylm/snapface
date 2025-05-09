import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../services/user-service'
import { User } from '../../../models/user.model'
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StatistiqueUserComponent } from '../statistique-user/statistique-user.component';
import { NgIf, TitleCasePipe } from '@angular/common';
import { ButtonFollowComponent } from '../button-follow/button-follow.component';
import { EditPhotosComponent } from "../user-data-update/edit-photos/edit-photos.component";
import { ChatPriveService } from 'src/services/chatprive.service';
import { Signalement } from 'src/models/signalement.model';
import { SignalementService } from 'src/services/signalement-service';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-header-snap',
  templateUrl: './header-snap.component.html',
  styleUrls: ['./header-snap.component.scss'],
  imports: [StatistiqueUserComponent, NgIf, ButtonFollowComponent, TitleCasePipe,
    FormsModule, EditPhotosComponent]
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

  choix(choix: string) {
    this.choixAffichageEvent.emit(choix)
  }

  constructor(private userService: UserService, private signalementService: SignalementService, private messageService: ChatPriveService,
    private router: ActivatedRoute, private route: Router) {
    this.user = router.snapshot.data['user'];
  }

  ngOnInit() {
    // this.displayUser();
    this.isDisplayPhotoViewerProfil = false;
    this.isDisplayPhotoViewerBackground = false;

    if (localStorage.getItem('userId') == this.id) {
      this.isMe = true;
    }
    setTimeout(() => {
      // this.checkIfDejaAbonnee();
    }, 400)
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
    this.userService.logout();
    this.route.navigate(['/']);
  }

  createConversation() {
    this.messageService.createConversation(
      localStorage.getItem('userId')?.toString() as string, this.user._id)
      .subscribe({
        next: (data: any) => {
          location.href = '/chat/' + data.insertedId;
        },
        error: (e) => console.error(e)
      });

  }

  signalement_raison = ""
  res_signalement = ""
  displayFormSignalmt = false;

  signaler() {
    let s = new Signalement("22", localStorage.getItem('userId')?.toString() as string, Date.now(),
      this.signalement_raison, null, this.user._id);
    s.userId = this.id
    console.log(s)
    this.signalementService.signalerUnUser(s).subscribe(
      {
        next: (data) => {
          if (data) {
            this.signalement_raison = ""
            this.displayFormSignalmt = false
            this.res_signalement = "Signaler avec succès!"
            setTimeout(() => { this.res_signalement = "" }, 1500)
          }
        }, error: (e) => {
          console.error(e)
        }
      })
  }

}


