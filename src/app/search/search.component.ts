import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Publication } from 'src/models/publication.model';
import { User } from 'src/models/user.model';
import { PublicationsService } from 'src/services/publication-service';
import { UserService } from 'src/services/user-service';
import { UserComponent } from '../user/users-list/user/user.component';
import { PublicationComponent } from "../post/publication/publication.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  standalone: true,
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [FormsModule, NgClass, NgIf, NgFor,
     UserComponent, PublicationComponent, HeaderComponent]
})
export class SearchComponent {

  search: string = "";
  lname: string = "";
  fname: string = "";
  
  filtre: string = "user";
  listeUser !: User[];
  listePost !: Publication[];
  constructor(protected userService: UserService, protected publicationService : PublicationsService) { }

  ngOnInit(){
    this.userService.getAllUsers().subscribe({
        next: (data) => {
          this.listeUser=data
        },
        error: (e) => console.error(e)
      })
  }
  
  researchUser() {
    this.listePost=[]
    if (this.lname.trim() != "" || this.fname.trim() !="")
      this.userService.searchByName(this.fname, this.lname ).subscribe({
        next: (data) => {
          this.listeUser=data
        },
        error: (e) => console.error(e)
      })
  }

  research(){
    this.listeUser=[]
    this.publicationService.searchByTitle(this.search ).subscribe({
      next: (data) => {
        this.listePost=data
        console.log(this.listePost)
      },
      error: (e) => console.error(e)
    })
  }
}
