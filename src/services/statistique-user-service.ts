import { Injectable } from '@angular/core';
import {
  HttpClientModule, HttpClient, HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StatistiqueUser } from '../models/statistique.user.model';
import { Abonnee } from 'src/models/abonnee.model';
import { Publication } from 'src/models/publication.model';
import { InteractionSociale } from 'src/models/interaction.sociale.model';



@Injectable({
  providedIn: 'root'
})

export class StatistiqueUserService {

  constructor(private http: HttpClient) { }

  getStatistiqueUserById(id: string): Observable<StatistiqueUser> {
    return this.http.get<StatistiqueUser>("https://snapface.onrender.com/api/statistiqueUserByUserId?id=" + id);
  }

  checkTotalFollowers(id: string): Observable<any> | void {

    this.http.get<StatistiqueUser>("https://snapface.onrender.com/api/statistiqueUserByUserId?id=" + id)
      .subscribe({
        next: (data) => {

          this.http.get<Abonnee>("http://localhost:4100/api/abonneesbyUserId?id=" + id)
            .subscribe({
              next: (data1) => {
                console.log(data.followers + " != " + data1.followers.length)
                if (data1.followers.length != data.followers
                  && data1 != null && data != null) {

                  this.http
                    .post<any>('http://localhost:4100/api/checkFollowers'
                      , { "id": id, "followers": data1.followers.length },

                    ).subscribe(data2 => {
                      if (data2)
                        console.log("Total followers in Statistique User update successful")
                    })
                }
              }, error: (e) => console.error(e),
              complete: () => console.log("TERMINEE")
            })

        },
        error: (e) => console.error(e)
      });
  }


  checkTotalPublication(id: string): Observable<any> | void {

    this.http.get<StatistiqueUser>("https://snapface.onrender.com/api/statistiqueUserByUserId?id=" + id)
      .subscribe({
        next: (data) => {

          this.http.get<Publication[]>("https://snapface.onrender.com/api/publicationByUserId?id=" + id)
            .subscribe({
              next: (data1) => {
                console.log(data.totalPosts + " != " + data1.length)
                if (data1.length != data.totalPosts
                  && data1 != null && data != null) {

                  this.http
                    .post<any>('http://localhost:4100/api/checkPublications'
                      , { "id": id, "publications": data1.length },

                    ).subscribe(data2 => {
                      if (data2)
                        console.log("Total posts in Statistique User update successful")
                    })
                }
              }, error: (e) => console.error(e),
              complete: () => console.log("TERMINEE")
            })

        },
        error: (e) => console.error(e)
      });
  }


}

