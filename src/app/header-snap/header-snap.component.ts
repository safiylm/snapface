import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user-service'
import { User } from '../../models/user.model'
import { Abonnee } from 'src/models/abonnee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StatistiqueUserComponent } from '../statistique-user/statistique-user.component';
import { NgIf } from '@angular/common';


@Component({
  standalone:true, 
  selector: 'app-header-snap',
  templateUrl: './header-snap.component.html',
  styleUrls: ['./header-snap.component.scss'], 
  imports:[StatistiqueUserComponent, NgIf]
})


export class HeaderSnapComponent implements OnInit {

  //Passing Data into this Component
  @Input() id !: string;
  isAbonnee: boolean = false;
  istMe: boolean = false;
  user !: User;
  abonnee!: Abonnee[];
  isDisplayPhotoViewerProfil !: boolean;
  isDisplayPhotoViewerBackground !: boolean;
  subscription !: Subscription;


  constructor(private userService: UserService, private router: ActivatedRoute,  private route: Router) {
      this.user = router.snapshot.data['user'];
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

  get Sabonner() { return (this.abonnee && !this.isAbonnee && !this.istMe) ? "" : null }
  get Sedesabonner() { return (this.abonnee && this.isAbonnee && !this.istMe) ? "" : null }

  displayUser(): void {
   this.subscription = this.userService.getUser(this.id)
      .subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (e) => console.error(e)
      });
  }

  getAbonneeByUserId(): void {
    this.subscription = this.userService.getAbonneeByUserId(this.id)
      .subscribe({
        next: (data) => {
          this.abonnee = data;
        },
        error: (e) => console.error(e)
      });
  }


  checkIfDejaAbonnee() {
    this.isAbonnee = false;
    if (this.abonnee)
      this.abonnee.forEach(element => {
        if (element.userId == this.id) {
          element.followers.forEach(element1 => {
            if (element1 === localStorage.getItem('userId')) {
              this.isAbonnee = true;
            }
          })
        }
      });
  }


  logout(){
    this.userService.logout();  
    this.route.navigate(['/']);
  }
  

  ngOnInit() {
   // this.displayUser();
    this.isDisplayPhotoViewerProfil = false;
    this.isDisplayPhotoViewerBackground = false;
    
    if (localStorage.getItem('userId') == this.id) {
      this.istMe = true;
    }
    this.getAbonneeByUserId();
    setTimeout(() => {
      this.checkIfDejaAbonnee();
    }, 400)
  }


  sabonner() {
    this.userService.addAbonnee(this.id);
    setTimeout(() => {
      this.checkIfDejaAbonnee();
    }, 400)

  }


  sedesabonner() {
    this.userService.removeAbonnee(this.id);
    setTimeout(() => {
      this.checkIfDejaAbonnee();
    }, 400)
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  

}


