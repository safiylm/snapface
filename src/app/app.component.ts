import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoadingService } from 'src/services/loading-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], 
})

export class AppComponent implements OnDestroy {
  unsubscribe = new Subject<void>();
  //loadingPosts = false;
  //loadingg = false;
  loading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingService, private router: Router) {
    this.router.events.pipe(takeUntil(this.unsubscribe))
      .subscribe((routerEvent) => {
        this.checkRouterEvent(routerEvent as RouterEvent);
      });
      console.log(this.loading$)
  }


  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
    /*  if (routerEvent.url == "/" || routerEvent.url == "/pour-moi") {
        this.loadingPosts = true;
      }else{
        this.loadingg =true
      }*/
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
    //  this.loadingPosts = false;
    //  this.loadingg =false

      //  console.log('done.');
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

}
