import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Signalement } from 'src/models/signalement.model';
import { SignalementService } from 'src/services/signalement-service';

@Component({
  standalone: true, 
  selector: 'app-signaler-user',
  templateUrl: './signaler-user.component.html',
  styleUrls: ['./signaler-user.component.scss'],
   imports: [ FormsModule]
})

export class SignalerUserComponent {
  signalement_raison = ""
  res_signalement = ""
  @Input() userID !: string;
  @Input() userName !: string;
  
  constructor( private signalementService: SignalementService){}
  

  signaler() {
    let s = new Signalement("22", localStorage.getItem('userId')?.toString() as string, Date.now(),
      this.signalement_raison, null, this.userID, null);
 
    this.signalementService.signalerUnUser(s).subscribe(
      {
        next: (data) => {
          if (data) {
            this.signalement_raison = ""
            this.res_signalement = "Signaler avec succès!"
            setTimeout(() => { this.res_signalement = "" }, 1500)
          }
        }, error: (e) => {
          console.error(e)
        }
      })
  }
}
