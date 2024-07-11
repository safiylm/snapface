import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user-service'
import { User } from '../../models/user.model'
import { Abonnee } from 'src/models/abonnee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-snap',
  templateUrl: './header-snap.component.html',
  styleUrls: ['./header-snap.component.scss']
})


export class HeaderSnapComponent implements OnInit {

  //Passing Data into this Component
  @Input() id !: string;
  isAbonnee: boolean = false;
  istMe: boolean = false;
  user !: User;
  abonnee!: Abonnee[];

  constructor(private userService: UserService, private router: Router) { }

  get UserName(){
    return (this.user && this.user.firstName && this.user.lastName)? this.user.firstName + " "+ this.user.lastName : null
  }
  get UserPhotoProfil(){
    return (this.user && this.user.photos_profil)? this.user.photos_profil : null
  }

  get UserPhotoBackground(){
    return (this.user && this.user.photos_background )? this.user.photos_background : null
  }

  get Sabonner() { return (this.abonnee && !this.isAbonnee && !this.istMe) ? "" : null }
  get Sedesabonner() { return (this.abonnee && this.isAbonnee && !this.istMe) ? "" : null }

  displayUser(): void {
    this.userService.getUser(this.id)
      .subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (e) => console.error(e)
      });
  }

  getAbonneeByUserId(): void {
    this.userService.getAbonneeByUserId(this.id)
      .subscribe({
        next: (data) => {
          this.abonnee = data;
        },
        error: (e) => console.error(e)
      });
  }


  checkIfDejaAbonnee() {
    this.abonnee.forEach(element => {
      element.followers.forEach(element1 => {
        if (element1 === localStorage.getItem('userId')) {
          this.isAbonnee = true;
        }
      })
    });
  }


  ngOnInit() {
    this.displayUser();
    if (localStorage.getItem('userId') == this.id) {
      this.istMe = true;
    }
    this.getAbonneeByUserId();

    setTimeout(() => {
      this.checkIfDejaAbonnee();
    }, 50);
  }


  sabonner() {
    this.userService.addAbonnee(this.id);
    this.isAbonnee = true;
    window.location.reload();
  }

  
  sedesabonner() {
    this.userService.removeAbonnee(this.id);
    this.isAbonnee = false;
    window.location.reload();
  }

}


