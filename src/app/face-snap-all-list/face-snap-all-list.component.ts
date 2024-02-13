import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../services/face-snap-service'

@Component({
  selector: 'app-face-snap-all-list',
  templateUrl: './face-snap-all-list.component.html',
  styleUrls: ['./face-snap-all-list.component.scss']
})

export class FaceSnapAllListComponent  implements OnInit {

  constructor( private faceSnapsService: FaceSnapsService) { }
 
  faceSnaps!: FaceSnap[];

  ngOnInit(): void {

    this.faceSnaps = this.faceSnapsService.faceSnaps ;

  }

}