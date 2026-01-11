import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
      let status = false;
       status  = JSON.parse(localStorage.getItem('userconnected')?.toString() as string).isLoggedIn
      if ( true) {
         status = true;
      }
      else {
         status = false;
      }
      return status;
   }
}


// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };