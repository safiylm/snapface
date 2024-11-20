import { Injectable } from '@angular/core';
import { User } from '../../models/user.model'
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user-service';


@Injectable({
  providedIn: 'root'
})

export class AllUsersResolverService {
  constructor(private user : UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User[]> | Observable<User[]>{
    return this.user.getAllUsers();
  
  }
}