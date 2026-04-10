import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { HeaderSnapComponent } from '../header-snap/header-snap.component';
import { PublicationListComponent } from "../../post/list/publication-list/publication-list.component";
import { InteractionsListComponent } from "../../post/list/interactions-list/interactions-list.component"
import { NgClass, NgIf } from '@angular/common';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user-service';

@Component({
  standalone: true,
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
  imports: [HeaderComponent, HeaderSnapComponent, NgIf,NgClass,
    PublicationListComponent, InteractionsListComponent]
})
export class MyAccountComponent implements OnInit {
  
  id !: string;
  display: string = ''
  user !: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
   this.id = JSON.parse(localStorage.getItem('userconnected')?.toString() as string).userId;

  //   this.display = "";
   if(this.id!= "" || this.id != undefined)
      this.userService.getUser(this.id).subscribe(data => {
        if (data) this.user = data
        console.log(data)
      })
  }

  choixAffichageEvent(choix: string) {
    this.display = choix;
  }

  get UserName() {
    return (this.user && this.user.name) ? this.user.name : null
  }
}
