import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FollowRequest } from 'src/models/followrequest';
import { User } from 'src/models/user.model';
import { AbonneeService } from 'src/services/abonnee-service';
import { UserService } from 'src/services/user-service';
import { FollowRequestComponent } from "./follow-request/follow-request.component";

@Component({
  standalone: true,
  selector: 'app-list-follow-request',
  templateUrl: './list-follow-request.component.html',
  styleUrls: ['./list-follow-request.component.scss'],
  imports: [NgFor, NgIf, FollowRequestComponent]
})
export class ListFollowRequestComponent {

  listUsers: User[] = [];
  

  constructor(private abonnementService: AbonneeService,
    private userService: UserService) { }

  ngOnInit() {
    this.abonnementService.getListOfFollowRequestByUserId(
      localStorage.getItem("userId")?.toString() as string
    ).subscribe({
      next: (data: FollowRequest[]) => {
        if (data) {
          for (let user of data)
            this.userService.getUser(user.from).subscribe
              ({
                next: (dataa) => {
                  if (dataa)
                    this.listUsers.push(dataa)
                }, error: e => {
                  console.error(e)
                }
              })
        }
      }, error: e => {
        console.error(e)
      }
    })

  }


}
