import { Component, OnInit  } from '@angular/core';
import { TextSnap } from '../models/text-snap.model';
import { TextSnapsService } from '../services/text-snap-service'

@Component({
  selector: 'app-text-snap-all-list',
  templateUrl: './text-snap-all-list.component.html',
  styleUrls: ['./text-snap-all-list.component.scss']
})

export class TextSnapAllListComponent  implements OnInit {

  constructor( private TextSnapsService: TextSnapsService) { }

  textSnaps!: TextSnap[];
  
  ngOnInit(): void {

    this.textSnaps = this.TextSnapsService.TextSnaps;
  }
  

}