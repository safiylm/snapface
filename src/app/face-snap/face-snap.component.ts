import { Component, OnInit, Input } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../services/face-snap-service'

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit {

  @Input() faceSnap!: FaceSnap;

  constructor(private faceSnapsService: FaceSnapsService) { }


  buttonText!: string;
  // ...

  ngOnInit() {
    this.buttonText = 'Oh Snap!';
  }

  onSnap() {
    if (this.buttonText === 'Oh Snap!') {
        this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'snap');
        this.buttonText = 'Oops, unSnap!';
    } else {
        this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'unsnap');
        this.buttonText = 'Oh Snap!';
    }
}
}
// ...
