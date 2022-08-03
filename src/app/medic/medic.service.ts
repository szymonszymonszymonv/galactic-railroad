import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Appointment } from '../appointment';
import { FreeAppointment } from '../freeAppointment';
import { Specialty } from '../specialty';
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

  getSpecialties(): Observable<Specialty[]> {
    return this.httpClient.get<Specialty[]>('specialties').pipe(
      tap((_) => {
        console.log('fetching specialties');
      }),
      catchError(this.handleError<Specialty[]>('getSpecialties()'))
    );
  }

  getAvailableAppointments(params: any = {}): Observable<FreeAppointment[]> {
    return this.httpClient.get<FreeAppointment[]>('appointments/available', {params: params}).pipe(
      map((appointments) => 
        appointments
          .sort(
            (a, b) =>
              Date.parse(a.startDate as string) - Date.parse(b.startDate as string)
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
        console.log('fetching available appointments');
        console.log(_);
      }),
      catchError(this.handleError<FreeAppointment[]>('getAvailableAppointments()'))
    );
  }

  getAppointments(medicId: string): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(`medics/${medicId}/appointments`).pipe(
      map((appointments) => 
        appointments
          .sort(
            (a, b) =>
              Date.parse(a.startDate as string) - Date.parse(b.startDate as string)
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

  addMedic(medic: Medic): Observable<any> {
    return this.httpClient.post('medics', medic).pipe(
      tap((_) => {
        console.log('adding medic');
      }),
      catchError(this.handleError<Medic>('addMedic()'))
    );
  }

  addAppointment(appointment: Appointment, medicId: string): Observable<Appointment> {
    return this.httpClient.post(`medics/${medicId}/appointments`, appointment).pipe(
      map(appointment => {
        return appointment as Appointment
      }),
      tap((_) => {
        console.log('adding appointmnet');
      }),
      catchError(this.handleError<Appointment>('addAppointment()'))
    );
  }

  removeAppointment(appointmentId: string): Observable<any> {
    return this.httpClient.delete(`appointments/${appointmentId}`).pipe(
      tap((_) => {
        console.log('deleting appointment');
      }),
      catchError(this.handleError<Appointment>('removeAppointment()'))
    )
  }

  editAppointment(appointment: Appointment): Observable<Appointment> {
    return this.httpClient.put('appointments', appointment).pipe(
      map(appointment => appointment as Appointment),
      tap((_) => {
        console.log('editing appointmnet');
      }),
      catchError(this.handleError<Appointment>('editAppointment()'))
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
