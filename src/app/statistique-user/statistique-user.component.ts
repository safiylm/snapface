import { Component, OnInit, Input } from '@angular/core';
import { StatistiqueUser } from '../../models/statistique.user.model'
import { StatistiqueUserService } from '../../services/statistique-user-service';

@Component({
  selector: 'app-statistique-user',
  templateUrl: './statistique-user.component.html',
  styleUrls: ['./statistique-user.component.scss']
})
export class StatistiqueUserComponent implements OnInit {

  statistiqueUser !: StatistiqueUser;
  @Input() id !: string;
  isVisibleListFollowers : boolean = false;

  constructor(private StatistiqueUserService: StatistiqueUserService) { }


  displayFollowers() {
      this.isVisibleListFollowers= true;
  }

  hideListFollowers()
{
  this.isVisibleListFollowers= false;
}

  ngOnInit() {
    this.StatistiqueUserService.getStatistiqueUserById(this.id)
      .subscribe({
        next: (data) => {
          this.statistiqueUser = data;
        },
        error: (e) => console.error(e)
      });
  }

}
