import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true, 
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  ngOnInit() {
    if (localStorage.getItem('isLoggedIn') == "true") {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

  }
}
