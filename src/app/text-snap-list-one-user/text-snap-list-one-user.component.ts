import { Component, OnInit  } from '@angular/core';
import { TextSnap } from '../models/text-snap.model';
import { TextSnapsService } from '../services/text-snap-service'
import { ActivatedRoute, ParamMap } from '@angular/router'


@Component({
  selector: 'app-text-snap-list-one-user',
  templateUrl: './text-snap-list-one-user.component.html',
  styleUrls: ['./text-snap-list-one-user.component.scss']
})

export class TextSnapListOneUserComponent implements OnInit {

  constructor(private route: ActivatedRoute , private TextSnapsService: TextSnapsService) { }
  id !:  any;
  textSnaps!: TextSnap[];
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.textSnaps = this.TextSnapsService.getTextSnapByAuteur(this.id);
  }
  

}