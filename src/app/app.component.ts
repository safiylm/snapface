import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {
  unsubscribe = new Subject<void>();
  loadingPosts = false;
  loading = false;

  constructor(private router: Router) {
    console.log('subscribing ...');
    this.router.events.pipe(takeUntil(this.unsubscribe))
      .subscribe((routerEvent) => {
        this.checkRouterEvent(routerEvent as RouterEvent);
      });
  }

  //activation des notifications
  ngOnInit() {
    /* if (Notification.permission !== 'granted') {
       Notification.requestPermission();
     }*/
  }

  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      if (routerEvent.url == "/" || routerEvent.url == "/pour-moi") {
        this.loadingPosts = true;
      }else{
        this.loading =true
      }
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loadingPosts = false;
      this.loading =false

      //  console.log('done.');
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

}
