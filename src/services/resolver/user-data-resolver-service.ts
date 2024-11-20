import { PublicationsService } from '../publication-service';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model'
import { Observable } from 'rxjs';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user-service';


@Injectable({
  providedIn: 'root'
})

export class UserDataResolverService {
  constructor(private user : UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User> | Observable<User>{
    return this.user.getUser( route.paramMap.get("id")?.toString() as string );
  }
}