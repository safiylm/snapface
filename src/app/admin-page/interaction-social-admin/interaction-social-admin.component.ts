import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Commentaire } from 'src/models/commentaire.model';
import { InteractionSociale } from 'src/models/interaction.sociale.model';
import { CommentaireService } from 'src/services/commentaire-service';
import { InteractionSocialeService } from 'src/services/interaction-social-service';

@Component({
  standalone: true,
  selector: 'app-interaction-social-admin',
  templateUrl: './interaction-social-admin.component.html',
  styleUrls: ['./interaction-social-admin.component.scss'],
  imports: [CommonModule]
})

export class InteractionSocialAdminComponent {

}
