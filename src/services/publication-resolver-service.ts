import { Injectable } from '@angular/core';
import { Publication } from '../models/publication.model'
import { Observable } from 'rxjs';
import { PublicationsService } from './publication-service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class PublicationsResolverService {
  constructor(private publication : PublicationsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Publication[]> | Observable<Publication[]>{
    return this.publication.getAllPublications();
  
  }
}