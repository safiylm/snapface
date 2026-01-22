import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-loading-spinner-response',
  templateUrl: './loading-spinner-response.component.html',
  styleUrls: ['./loading-spinner-response.component.scss'],
  imports:[NgIf]
})
export class LoadingSpinnerResponseComponent {

  @Input() text !:string; 
  
}
