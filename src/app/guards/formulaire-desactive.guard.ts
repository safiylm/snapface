import { CanActivateFn } from '@angular/router';

/**
  * canDeactivate est l’inverse de canActivate. 
  * Il permet de vérifier si on peut quitter une route. 
  * Par exemple, si on a un formulaire non sauvegardé, 
  * on pourrait vouloir afficher un message de confirmation avant de quitter la route.
**/


export const formulaireDesactiveGuard: CanActivateFn = (route, state) => {

  return confirm('Êtes-vous sûr de quitter cette page?');

};
