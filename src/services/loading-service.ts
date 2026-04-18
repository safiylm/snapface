// loading.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, observeOn, asyncScheduler } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoadingService {
  
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable().pipe(
  observeOn(asyncScheduler)
  //permet d'eviter l'erruer ExpressionChangedAfterItHasBeenCheckedError arrive quand une valeur 
  // liée au template change pendant le même cycle de détection Angular.
  
);// loading$ émet false → true juste après le premier check du AppComponent.
//Angular a déjà vérifié false, puis l’Observable pousse true dans le même cycle, donc erreur.
  
  private requestCount = 0;

  show() {
    this.requestCount++;
    this.loadingSubject.next(true);
  }

  hide() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.loadingSubject.next(false);
    }
  }
}

