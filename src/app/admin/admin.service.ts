import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import Admin from './admin';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  createAdmin(adminObj: any): Observable<any> {
    const admin: Admin = new Admin(adminObj.email, adminObj.password)
    return this.httpClient.post("admin",  admin)
      .pipe(
        tap(_ => { console.log(`creating admin`) }),
        catchError(this.handleError<any>(`createAdmin()`))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  // methods
}
