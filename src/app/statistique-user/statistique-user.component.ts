import { Component , OnInit, Input} from '@angular/core';
import { StatistiqueUser } from '../../models/statistique.user.model'
import { StatistiqueUserService } from '../../services/statistique-user-service';

@Component({
  selector: 'app-statistique-user',
  templateUrl: './statistique-user.component.html',
  styleUrls: ['./statistique-user.component.scss']
})
export class StatistiqueUserComponent  implements OnInit {
  
  statistiqueUser !: StatistiqueUser;
  @Input() id !: string ;

  constructor(private StatistiqueUserService: StatistiqueUserService) { }

    ngOnInit() {
      this.StatistiqueUserService.getStatistiqueUserById(this.id)
            .subscribe({
        next: (data) => {
          this.statistiqueUser = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
    }

}
