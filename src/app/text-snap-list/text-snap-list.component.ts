
import { Component, OnInit  } from '@angular/core';
import { TextSnap } from '../models/text-snap.model';
import { TextSnapsService } from '../services/text-snap-service'
import { ActivatedRoute, ParamMap } from '@angular/router'

//...
@Component({
  selector: 'app-text-snap-list', 
  templateUrl: './text-snap-list.component.html',
  styleUrls: ['./text-snap-list.component.scss']
})

export class TextSnapListComponent implements OnInit {

  constructor(private route: ActivatedRoute , private TextSnapsService: TextSnapsService) { }
  id !:  any;
  textSnaps!: TextSnap[];
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.textSnaps = this.TextSnapsService.TextSnaps;
  }
  

}