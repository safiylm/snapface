import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service'
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model'
import { FormGroup, FormControl } from "@angular/forms";


@Component({
  selector: 'app-user-data-update',
  templateUrl: './user-data-update.component.html',
  styleUrls: ['./user-data-update.component.scss']
})
export class UserDataUpdateComponent implements OnInit {

  @Input() userId !: any ;
  
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  user?: User;
  user2 = new User(this.userId, "","","","", "", "",  0);

  updateUserForm = new FormGroup({
    lastName: new FormControl( this.user?.lastName.toString() ),
    firstName: new FormControl(this.user?.firstName.toString()),
    email: new FormControl(this.user?.email.toString()),
    password: new FormControl(this.user?.password.toString()),
    phoneNo : new FormControl(this.user?.phoneNo ),
    photos_background: new FormControl(this.user?.photos_background.toString()),
    photos_profil: new FormControl(this.user?.photos_profil.toString())
  });


  retrieveUser(): void {
    this.userService.getUser( this.userId) 
      .subscribe({
        next: (data) => {
          this.user = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  ngOnInit() {
   this.retrieveUser()

  } 
  
  onSubmit(){

    this.user2._id = this.userId;
    
    this.user2.lastName= this.updateUserForm.value['lastName']?.toString() as string;
    if( this.user2.lastName==undefined){
      this.user2.lastName=this.user?.lastName.toString() as string;
    }
    this.user2.firstName= this.updateUserForm.value['firstName']?.toString() as string;
    if( this.user2.firstName==undefined){
      this.user2.firstName=this.user?.firstName as string;
    }
    this.user2.email= this.updateUserForm.value['email']?.toString() as string;
    if( this.user2.email==undefined){
      this.user2.email=this.user?.email as string;
    }
    this.user2.password= this.updateUserForm.value['password']?.toString() as string;
    if( this.user2.password==undefined){
      this.user2.password=this.user?.password as string;
    }
  
    this.user2.photos_background= this.updateUserForm.value['photos_background']?.toString() as string;
    if( this.user2.photos_background==undefined){
      this.user2.photos_background=this.user?.photos_background as string;
    }
    this.user2.photos_profil= this.updateUserForm.value['photos_profil']?.toString() as string;
    if( this.user2.photos_profil==undefined){
      this.user2.photos_profil=this.user?.photos_profil as string;
    }

     this.user2.phoneNo= Number( this.updateUserForm.value['phoneNo']?.toString());
    if( Number.isNaN(this.user2.phoneNo)){
      this.user2.phoneNo=Number(this.user?.phoneNo) ;
    }
    //console.log(this.user2)
    this.userService.updateUser(this.user2)
  }

  
}
