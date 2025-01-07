import { Component, Input } from '@angular/core';
import { StatistiqueUser } from 'src/models/statistique.user.model';
import { StatistiqueUserService } from 'src/services/statistique-user-service';

@Component({
  standalone : true,
  selector: 'app-statistique-user-admin',
  templateUrl: './statistique-user-admin.component.html',
  styleUrls: ['./statistique-user-admin.component.scss']
})
export class StatistiqueUserComponent {
  @Input() userId !: string;
  statistiqueUser !: StatistiqueUser;

  constructor(private statistiqueUserService: StatistiqueUserService) { }

  ngOnInit() {
    this.statistiqueUserService.getStatistiqueUserById(this.userId).subscribe({
      next: (data) => {
        if (data) {
          this.statistiqueUser = data;
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des stat des users', err);
      }
    });
  }
}