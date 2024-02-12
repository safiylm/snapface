import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../services/face-snap-service'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { user_array } from '../json-database/users-array';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})


export class FaceSnapListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private faceSnapsService: FaceSnapsService) { }
  id !: any;
  photo_profil !: string
  photo_background !: string
  faceSnaps!: FaceSnap[];

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    user_array.forEach((item) => {
      if( item.id == this.id){
        this.photo_profil= item['photos-profil'];
        this.photo_background= item['photos-background'];
      }
    })

    this.faceSnaps = this.faceSnapsService.faceSnaps;
  }

}