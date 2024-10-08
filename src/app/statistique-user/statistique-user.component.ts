import { Component, OnInit, Input } from '@angular/core';
import { StatistiqueUser } from '../../models/statistique.user.model'
import { StatistiqueUserService } from '../../services/statistique-user-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-statistique-user',
  templateUrl: './statistique-user.component.html',
  styleUrls: ['./statistique-user.component.scss']
})
export class StatistiqueUserComponent implements OnInit {

  statistiqueUser !: StatistiqueUser;
  @Input() id !: string;
  isVisibleListFollowers : boolean = false;
  subscription !: Subscription;

  constructor(private StatistiqueUserService: StatistiqueUserService) { }

  get Followers() { return (this.statistiqueUser && this.statistiqueUser.followers) ? this.statistiqueUser.followers : 0 }
  get TotalPoints() { return (this.statistiqueUser && this.statistiqueUser.totalPoints) ? this.statistiqueUser.totalPoints : 0 }
  get TotalPosts() { return (this.statistiqueUser && this.statistiqueUser.totalPosts) ? this.statistiqueUser.totalPosts : 0 }
  
  displayFollowers() {
      this.isVisibleListFollowers= true;
  }

  hideListFollowers()
{
  this.isVisibleListFollowers= false;
}

  ngOnInit() {
    this.subscription = this.StatistiqueUserService.getStatistiqueUserById(this.id)
      .subscribe({
        next: (data) => {
          this.statistiqueUser = data;
        },
        error: (e) => console.error(e)
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
