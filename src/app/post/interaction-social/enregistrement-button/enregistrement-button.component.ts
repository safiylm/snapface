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

    this.interactionService.joinRoom(this.post._id);

    this.interactionService.interactionExist(this.post._id,
      localStorage.getItem("userId")?.toString() as string, "enregistrement").subscribe({
        next: (data) => {
          if (data != null) {
            this.isSaved = true
            this.interactionId = data._id

          }
        }, error: e => console.error(e)
      })

    this.interactionService.getInteractionsWithSocket().subscribe((data: any) => {
      if (data['postId'] == this.post._id && data['interaction']=="enregistrement") {
        if (data["action"] == "remove" ) {
          this.isSaved = false
          this.interactionId = ""
        } 
         if (data["action"] == "add") {
          this.isSaved = true
          this.interactionId = data.interactionId

        }             
      }
    });
  }



  save() {
    if (!this.isSaved)
      this.interactionService.create(this.post._id, "enregistrement")
    else
      this.interactionService.remove(this.post._id, this.interactionId, "enregistrement")
  }
}
