import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user-service'
import { User } from '../../models/user.model'

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

  constructor(private userService: UserService) { }


  displayUser(): void {
    this.userService.getUser(this.id)
      .subscribe({
        next: (data) => {
          this.user = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  ngOnInit() {
    this.displayUser()
    if (localStorage.getItem('userId') == this.id) {
      this.istMe = true;
    }

  }

  sabonner() {
    this.userService.addAbonnee(this.id);
    this.isAbonnee = true;
  }

  sedesabonner() {
    this.userService.removeAbonnee(this.id);
    this.isAbonnee = false;
  }

}


