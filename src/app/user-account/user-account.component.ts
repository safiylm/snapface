import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})

export class UserAccountComponent  implements OnInit {

  id !: string ;
  
  constructor( private route: ActivatedRoute) { 
    this.id = this.route.snapshot.paramMap.get('id')! ;  
  }

  ngOnInit() {
  }

}
