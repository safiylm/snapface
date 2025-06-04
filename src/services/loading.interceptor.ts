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
import { url } from './url'

@Injectable()

export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) { }
  private excludedUrls = [
    url + '/api/interaction/enregistrementAdd',
    url + '/api/interaction/enregistrementRemove',
    url + '/api/interaction/pointsAdd',
    url + '/api/interaction/pointsRemove',
    url + '/api/interaction/likesAdd',
    url + '/api/interaction/likesRemove',
    url + '/api/publication',
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