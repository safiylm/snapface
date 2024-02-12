
import { Component, OnInit  } from '@angular/core';
import { TextSnap } from '../models/text-snap.model';
import { TextSnapsService } from '../services/text-snap-service'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { user_array } from '../json-database/users-array';

//...
@Component({
  selector: 'app-text-snap-list', 
  templateUrl: './text-snap-list.component.html',
  styleUrls: ['./text-snap-list.component.scss']
})

export class TextSnapListComponent implements OnInit {

  constructor(private route: ActivatedRoute , private TextSnapsService: TextSnapsService) { }
  id !:  any;
  photo_profil !: string
  photo_background !: string
  textSnaps!: TextSnap[];
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    user_array.forEach((item) => {
      if( item.id == this.id){
        this.photo_profil= item['photos-profil'];
        this.photo_background= item['photos-background'];
      }
    })
    this.textSnaps = this.TextSnapsService.TextSnaps;
  }
  

}