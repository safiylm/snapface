import { Component, OnInit, Input } from '@angular/core';
import { StatistiqueUser } from '../../models/statistique.user.model'
import { StatistiqueUserService } from '../../services/statistique-user-service';
import { Subscription } from 'rxjs';
import { ListFollowersComponent } from '../list-followers/list-followers.component';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-statistique-user',
  templateUrl: './statistique-user.component.html',
  styleUrls: ['./statistique-user.component.scss'],
  imports: [ListFollowersComponent, NgIf]
})
export class StatistiqueUserComponent implements OnInit {

  statistiqueUser !: StatistiqueUser;
  @Input() id !: string;
  isVisibleListFollowers: boolean = false;
  subscription !: Subscription;

  constructor(private StatistiqueUserService: StatistiqueUserService) { }

  get Followers() { return (this.statistiqueUser && this.statistiqueUser.followers) ? this.statistiqueUser.followers : 0 }
  get TotalPoints() { return (this.statistiqueUser && this.statistiqueUser.totalPoints) ? this.statistiqueUser.totalPoints : 0 }
  get TotalPosts() { return (this.statistiqueUser && this.statistiqueUser.totalPosts) ? this.statistiqueUser.totalPosts : 0 }

  displayFollowers() {
    this.isVisibleListFollowers = true;
  }

  hideListFollowers() {
    this.isVisibleListFollowers = false;
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
