import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../services/face-snap-service'
import { ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})


export class FaceSnapListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private faceSnapsService: FaceSnapsService) { }
  id !: any;
  faceSnaps!: FaceSnap[];

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.faceSnaps = this.faceSnapsService.getAllFaceSnapsByAuteur(this.id);
  }

}