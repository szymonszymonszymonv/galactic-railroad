import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Appointment } from '../appointment';
import { Medic } from '../medic/medic';
import { AppState } from './app.state';
import { MedicsState } from './medics.state';

export const selectMedics = createFeatureSelector<MedicsState>('medics');
export const selectMedicsItems = createSelector(
  selectMedics,
  (medics) => medics.medics
);
export const selectChosenMedic = createSelector(
  selectMedics,
  (medics) => medics.selectedMedic
);
export const selectAppointments = createSelector(
  selectMedics, 
  (medics) => medics.appointments
  // [...medics.appointments]
  //   .sort((a, b) => {
  //     return (
  //       Date.parse(a.startDate as string) - Date.parse(b.startDate as string)
  //     );
  //   })
  //   .map((appointment) => {
  //     return {
  //       ...appointment,
  //       startDate: new Date(appointment.startDate),
  //       endDate: new Date(appointment.endDate),
  //     };
  //   })

);
