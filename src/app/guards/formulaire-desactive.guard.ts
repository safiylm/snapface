import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanDeactivate, CanDeactivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

/**
  * canDeactivate est l’inverse de canActivate. 
  * Il permet de vérifier si on peut quitter une route. 
  * Par exemple, si on a un formulaire non sauvegardé, 
  * on pourrait vouloir afficher un message de confirmation avant de quitter la route.
**/

/*
export const formulaireDesactiveGuard: CanDeactivateFn<FeedbackRoute>  = (component: FeedbackRoute) => {
 window.onbeforeunload = () => {
    confirm("Êtes-vous sûr de quitter cette page?")
  }
  console.log(component)
  return confirm('Êtes-vous sûr de quitter cette page?');

};
*/

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}

@Injectable({
  providedIn: 'root'
})

export class formulaireDesactiveGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}

