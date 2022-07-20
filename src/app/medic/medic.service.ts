import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Appointment } from '../appointment';
import { Medic } from './medic';

@Injectable({
  providedIn: 'root',
})
export class MedicService {
  constructor(private httpClient: HttpClient) {}

  getMedics(): Observable<Medic[]> {
    return this.httpClient.get<Medic[]>('medics').pipe(
      tap((_) => {
        console.log('fetching medics');
      }),
      catchError(this.handleError<Medic[]>('getMedics()'))
    );
  }

  getAppointments(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>('appointments').pipe(
      map((appointments) => 
        appointments
          .sort(
            (a, b) =>
              Date.parse(a.startDate as string) -
              Date.parse(b.startDate as string)
          )
          .map((appointment) => {
            return {
              ...appointment,
              startDate: new Date(appointment.startDate),
              endDate: new Date(appointment.endDate),
            };
          })
      ),
      tap((_) => {
        console.log('fetching appointments');
      }),
      catchError(this.handleError<Appointment[]>('getAppointments()'))
    );
  }
  //   [...medics.appointments]
  //     .sort((a, b) => {
  //       return (
  //         Date.parse(a.startDate as string) - Date.parse(b.startDate as string)
  //       );
  //     })
  //     .map((appointment) => {
  //       return {
  //         ...appointment,
  //         startDate: new Date(appointment.startDate),
  //         endDate: new Date(appointment.endDate),
  //       };
  //     })
  // );

  addMedic(medic: Medic): Observable<any> {
    return this.httpClient.post('medics', medic).pipe(
      tap((_) => {
        console.log('adding medic');
      }),
      catchError(this.handleError<Medic>('addMedic()'))
    );
  }

  addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.httpClient.post('appointments', appointment).pipe(
      map(appointment => {
        return {
          ...appointment,
          startDate: new Date((appointment as Appointment).startDate),
          endDate: new Date((appointment as Appointment).endDate),
        } as Appointment
      }),
      tap((_) => {
        console.log('adding appointmnet');
      }),
      catchError(this.handleError<Appointment>('addAppointment()'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
