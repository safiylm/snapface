import { Component, OnInit, Input } from '@angular/core';
import { TextSnap } from '../models/text-snap.model';
import { TextSnapsService } from '../services/text-snap-service'

@Component({
  selector: 'app-text-snap',
  templateUrl: './text-snap.component.html',
  styleUrls: ['./text-snap.component.scss']
})

export class TextSnapComponent implements OnInit {

  @Input() textSnap!: TextSnap;

  constructor(private TextSnapsService: TextSnapsService) { }


  buttonText!: string;
  // ...

  ngOnInit() {
    this.buttonText = 'Oh Snap!';
  }

  onSnap() {
    if (this.buttonText === 'Oh Snap!') {
        this.TextSnapsService.snapTextSnapById(this.textSnap.id, 'snap');
        this.buttonText = 'Oops, unSnap!';
    } else {
        this.TextSnapsService.snapTextSnapById(this.textSnap.id, 'unsnap');
        this.buttonText = 'Oh Snap!';
    }
}
}
// ...
