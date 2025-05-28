import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
// loading.interceptor.ts
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading-service';

@Injectable()

export class LoadingInterceptor implements HttpInterceptor {

  private url = 'http://localhost:4100'
  constructor(private loadingService: LoadingService) { }
  private excludedUrls = [
    this.url + '/api/interaction/enregistrementAdd',
    this.url + '/api/interaction/enregistrementRemove',
    this.url + '/api/interaction/pointsAdd',
    this.url + '/api/interaction/pointsRemove',
    this.url + '/api/interaction/likesAdd',
    this.url + '/api/interaction/likesRemove',
    this.url + '/api/publication',
  ];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Vérifie si l'URL de la requête est exclue
    const shouldExclude = this.excludedUrls.some(url => req.url.includes(url));

    if (shouldExclude) {
      return next.handle(req); // on laisse passer sans rien faire
    }


    this.loadingService.show();

    return next.handle(req).pipe(
      finalize(() => this.loadingService.hide())
    );

  }

} 