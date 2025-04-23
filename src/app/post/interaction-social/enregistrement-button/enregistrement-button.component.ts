import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Publication } from 'src/models/publication.model';
import { InteractionSocialeService } from 'src/services/interaction-social-service';

@Component({
  standalone: true,
  selector: 'app-enregistrement-button',
  templateUrl: './enregistrement-button.component.html',
  styleUrls: ['./enregistrement-button.component.scss'],
  imports: [NgIf]
})
export class EnregistrementButtonComponent {

  isSaved = false;
  interactionId = ""
  @Input() post !: Publication;

  constructor(private interactionService: InteractionSocialeService) { }

  ngOnInit() {
    this.interactionService.getIfUserAlreadySavePost(this.post._id,
      localStorage.getItem("userId")?.toString() as string).subscribe({
        next: (data) => {
          if (data != null) {
            this.isSaved = true
            this.interactionId = data._id

          }
        }, error: e => console.error(e)
      })
  }

  save() {
    this.interactionService.addEnregistrement(this.post._id)
      .subscribe(data => {
        if (data) {
          this.isSaved = true;
          this.interactionId = data.insertId
        }
      })
  }

  unsave() {
    if (this.interactionId != "")
      this.interactionService.removeEnregistrement(this.post._id, this.interactionId)
        .subscribe(data => {
          if (data) {
            this.isSaved = false;
            this.interactionId = ""
          }
        })
  }
}
