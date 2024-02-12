import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-snap',
  templateUrl: './header-snap.component.html',
  styleUrls: ['./header-snap.component.scss']
})


export class HeaderSnapComponent {
  //Passing Data into this Component
  @Input() id !: number;
  @Input() photo_profil !: string;
  @Input() photo_background !: string;
}


