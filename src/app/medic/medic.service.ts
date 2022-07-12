import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Medic } from './medic';

@Injectable({
  providedIn: 'root'
})
export class MedicService {

  constructor(private httpClient: HttpClient) { }

  getMedics(): Observable<Medic[]> {
    return this.httpClient.get<Medic[]>("medics")
      .pipe(
        tap(_ => { console.log("fetching medics") }),
        catchError(this.handleError<Medic[]>('getMedics()'))
      )
  }

  addMedic(medic: Medic): Observable<any> {
    return this.httpClient.post('medics', medic)
      .pipe(
        tap(_ => { console.log("adding medic") }),
        catchError(this.handleError<Medic>('postMedic()'))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
