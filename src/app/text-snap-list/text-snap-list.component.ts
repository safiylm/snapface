
import { Component , OnInit} from '@angular/core';
import { TextSnap } from '../models/text-snap.model';
import { TextSnapsService } from '../services/text-snap-service'

//...
@Component({
  selector: 'app-text-snap-list',
  templateUrl: './text-snap-list.component.html',
  styleUrls: ['./text-snap-list.component.scss']
})

export class TextSnapListComponent implements OnInit {
constructor(private TextSnapsService: TextSnapsService) { }

  textSnaps!: TextSnap[];

  ngOnInit(): void {
    this.textSnaps = this.TextSnapsService.TextSnaps;
}
}