import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
   providedIn: 'root'
})
export class AuthGuard implements CanActivate {

   constructor(private router: Router) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.isLoggedIn()) {
         return true;
      }
      // navigate to login page as user is not authenticated      
      this.router.navigate(['/connexion']);
      return false;
   }

   public isLoggedIn(): boolean {
      let status  = JSON.parse(localStorage.getItem('userconnected')?.toString() as string).isLoggedIn as boolean
      return status;
   }
}
