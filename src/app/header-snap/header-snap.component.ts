import { Component, OnInit, Input } from '@angular/core';
import { user_array } from '../json-database/users-array';

@Component({
  selector: 'app-header-snap',
  templateUrl: './header-snap.component.html',
  styleUrls: ['./header-snap.component.scss']
})


export class HeaderSnapComponent implements OnInit {
 
  //Passing Data into this Component
  @Input() id !: number;
  photo_profil !: string;
  photo_background !: string;
  name !: string ;

  ngOnInit(): void {
    user_array.forEach((item) => {
      if( item.id == this.id){
        this.photo_profil= item['photos_profil'];
        this.photo_background= item['photos_background']
        this.name= item['firstName']
      }
    })
  }
  
}


