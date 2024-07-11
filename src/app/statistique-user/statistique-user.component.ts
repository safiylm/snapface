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

  get Followers() { return (this.statistiqueUser && this.statistiqueUser.followers) ? this.statistiqueUser.followers : null }
  get TotalPoints() { return (this.statistiqueUser && this.statistiqueUser.totalPoints) ? this.statistiqueUser.totalPoints : null }
  get TotalPosts() { return (this.statistiqueUser && this.statistiqueUser.totalPosts) ? this.statistiqueUser.totalPosts : null }
  
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
