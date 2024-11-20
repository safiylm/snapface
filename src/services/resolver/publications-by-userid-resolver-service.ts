import { Injectable } from '@angular/core';
import { Publication } from '../../models/publication.model'
import { Observable } from 'rxjs';
import { PublicationsService } from '../publication-service';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class PublicationsByUserIdResolverService {
  constructor(private publication : PublicationsService) { }

  resolve(routee: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Publication[]> | Observable<Publication[]>{
    return this.publication.getAllPublicationsByUserId(routee.paramMap.get("id")?.toString() as string)
  
  }
}