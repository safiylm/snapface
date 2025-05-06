import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from 'src/models/user.model';
import { AbonneeService } from 'src/services/abonnee-service';

@Component({
  standalone: true,
  selector: 'app-follow-request',
  templateUrl: './follow-request.component.html',
  styleUrls: ['./follow-request.component.scss'], 
  imports: [NgIf]
})
export class FollowRequestComponent {

  @Input() user !: User;
  resultat = ""

  constructor(private abonnementService: AbonneeService) { }

  accepted(to_id: string) {
    this.abonnementService.acceptFollowRequest(to_id).subscribe({
      next: (data: any) => {
        if (data) {
          this.resultat = 'Demande de suivi est acceptée.'
        }
      }, error: e => {
        console.error(e)
      }
    })
  }

  rejected(to_id: string) {
    this.abonnementService.rejectFollowRequest(to_id).subscribe({
      next: (data: any) => {
        if (data) {
          this.resultat = 'Demande de suivi est recjectée.'
        }
      }, error: e => {
        console.error(e)
      }
    })

  }

}
