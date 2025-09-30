import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Publication } from 'src/models/publication.model';
import { Signalement } from 'src/models/signalement.model';
import { SignalementService } from 'src/services/signalement-service';

@Component({
  standalone: true,
  selector: 'app-signaler-post',
  templateUrl: './signaler-post.component.html',
  styleUrls: ['./signaler-post.component.scss'],
  imports: [FormsModule]

})
export class SignalerPostComponent {
  raison = ""
  res = ""
  @Input() post!: Publication;

  constructor(private signalementService: SignalementService) { }
  signaler() {
    let s = new Signalement("22", localStorage.getItem('userId')?.toString() as string, Date.now(),
      this.raison, this.post._id, null, null);
    this.signalementService.signalerUnePublication(s).subscribe(
      {
        next: (data) => {
          if (data) {
            this.raison = ""
            this.res = "Signaler avec succès!"
            setTimeout(() => { this.res = "" }, 1500)
          }
        }, error: (e) => {
          console.error(e)
        }
      })
  }

}
